---
template: doc
theme: paper
title: 第 4 卷 · 控制：FOC、DTC 与无传感器
subtitle: 电机知识库 · 分卷版
file: 04-control
outline: right
source: 电机知识库 · 第 4 卷
---

[← 返回总览](index.html)

从信号链、电流环、SVPWM 到 DTC、观测器、MTPA 与弱磁轨迹，讲清控制层怎么把转矩凑出来。

## A 控制：FOC、DTC、三环与极限圆


### 完整信号链

**前向通道**：

```flow
ω* -> 速度环: PI -> iq*
iq* -> 分配: MTPA/弱磁 -> id*、iq*
id*、iq* -> 电流环: PI -> ud、uq
ud、uq -> 反Park -> SVPWM -> 逆变器 -> 电机
```

**反馈通道**：

```flow
电机 -> 采样电流 -> Clarke -> Park -> 电流环
电机 -> 编码器/观测器 -> θe -> Park
```

### FOC：把交流量旋转成直流量

**Clarke 变换**（幅值不变）：

$$
i_\alpha=\frac{2}{3}\left(i_a-\frac{1}{2}i_b-\frac{1}{2}i_c\right),\qquad i_\beta=\frac{1}{\sqrt3}(i_b-i_c)
$$

**Park 变换**：

$$
i_d=i_\alpha\cos\theta_e+i_\beta\sin\theta_e
$$

$$
i_q=-i_\alpha\sin\theta_e+i_\beta\cos\theta_e
$$

**反 Park 变换**：

$$
u_\alpha=u_d\cos\theta_e-u_q\sin\theta_e
$$

$$
u_\beta=u_d\sin\theta_e+u_q\cos\theta_e
$$

戴上这副「眼镜」后，三相交流量变成两个直流量。PI 调节器才能无静差地调节。

**电流环电压方程**：

$$
u_d=R_si_d+L_d\frac{di_d}{dt}-\omega_eL_qi_q
$$

$$
u_q=R_si_q+L_q\frac{di_q}{dt}+\omega_e(L_di_d+\psi_f)
$$

交叉项 $-\omega_eL_qi_q$ 与 $+\omega_e(L_di_d+\psi_f)$ 是耦合。工程上用前馈补偿把它们抵消。

### DTC：不拆坐标，直接砸电压矢量

定子磁链估算：

$$
\psi_s=\int(u_s-R_si_s)\,dt
$$

转矩估算：

$$
T_e=\frac{3}{2}p(\psi_\alpha i_\beta-\psi_\beta i_\alpha)
$$

控制逻辑：

1. 比较磁链幅值与给定，滞环输出 $\pm1$。
2. 比较转矩与给定，滞环输出 $\pm1$。
3. 查开关表，直接选 8 个电压矢量之一。

没有电流环，没有 PWM 调制器。转矩响应快，但开关频率不固定，转矩脉动大。

### FOC 与 DTC 的分水岭

| 维度 | FOC | DTC |
| --- | --- | --- |
| 坐标变换 | 需要 Clarke 与 Park | 不做坐标解耦 |
| 中间环 | 有电流环与调制器 | 无电流环，滞环加查表 |
| 开关频率 | 固定，由 SVPWM 决定 | 不固定，随滞环变化 |
| 转矩脉动 | 小 | 偏大 |
| 低速性能 | 好 | 受定子电阻误差影响 |
| 参数敏感性 | 依赖 $L_d$、$L_q$、$\psi_f$ | 依赖 $R_s$ 与磁链估算 |
| 典型场景 | 伺服、EV 主驱、家电 | 大功率牵引、快速转矩响应 |
| 出身 | 通用；PMSM、BLDC、异步机都能用 | ABB 最早做在异步机上，后移植到 PMSM |

**一句话**：FOC 是「先把电流拆成两个直流量再精细调」；DTC 是「不拆，直接拿转矩误差砸电压矢量」。

### 三环是套娃，不是方法

$$
\text{位置环}\supset\text{速度环}\supset\text{电流环}
$$

运动方程：

$$
J\frac{d\omega_r}{dt}=T_e-T_L-B_\omega\omega_r
$$

- 速度环在外，误差进 PI，输出转矩指令或 $i_q^*$。
- 电流环在内，让实际 $i_d,i_q$ 追上指令。
- 位置环再外一层，用于伺服定位。

**带宽分离**：电流环带宽通常是速度环的 5~10 倍。内环快，外环慢，系统才稳定。

**常见量级**：电流环 1~2 kHz，速度环 100~300 Hz。具体值随采样率、滤波与机械惯量变化。

### 电流环整定：带宽、延迟与解耦

电流环是 FOC 最内层。它要让 $i_d$、$i_q$ 快速追上指令。

d 轴与 q 轴的电压方程：

$$ u_d=R_si_d+L_d\frac{di_d}{dt}-\omega_eL_qi_q $$

$$ u_q=R_si_q+L_q\frac{di_q}{dt}+\omega_e\left(L_di_d+\psi_f\right) $$

交叉项 $-\omega_eL_qi_q$ 与 $+\omega_e(L_di_d+\psi_f)$ 是耦合。转速越高，耦合越强。

**前馈解耦**：在 PI 输出上叠加：

$$ u_d^*=u_{d,PI}-\omega_eL_qi_q $$

$$ u_q^*=u_{q,PI}+\omega_e\left(L_di_d+\psi_f\right) $$

这样 d 轴只看到 $R_s+L_ds$，q 轴只看到 $R_s+L_qs$。两个轴可以独立整定。

**PI 整定**：以 d 轴为例，对象为：

$$ G_p(s)=\frac{1}{L_ds+R_s} $$

取 $K_i/K_p=R_s/L_d$，反馈环带宽：

$$ \omega_c=\frac{K_p}{L_d} $$

所以：

$$ K_p=L_d\omega_c,\qquad K_i=R_s\omega_c $$

**延迟的影响**：数字控制有采样保持与 PWM 更新延迟。近似为一个一阶惯性环节：

$$ G_d(s)\approx\frac{1}{1+1.5T_ss} $$

其中 $T_s$ 是采样周期。延迟会吃掉相位裕度。电流环带宽通常取开关频率的 1/10~1/6。例如 10 kHz 开关频率，电流环带宽约 1~1.5 kHz。

**速度环**：对象是机械惯性：

$$ J\frac{d\omega_r}{dt}=T_e-T_L-B_\omega\omega_r $$

近似传递函数：

$$ G_\omega(s)=\frac{1}{Js+B_\omega} $$

速度环 PI 的带宽通常为电流环的 1/5~1/10。典型 100~300 Hz。内环快，外环慢，系统才稳定。

**工程要点**：

1. **抗积分饱和**：指令突变或电压限幅时，积分器会饱和。用钳位或反算抗饱和。
2. **参数变化**：$L_d$、$L_q$ 随饱和变化，$R_s$ 随温度变化，$\psi_f$ 随温度下降。整定值要留裕度。
3. **采样同步**：ADC 采样与 PWM 中心对齐，避开开关噪声。
4. **滤波**：电流滤波会加延迟。带宽与噪声要折中。
5. **死区补偿**：低速时死区误差相对反电势很大。不补偿会造成电流畸变。

**一句话**：电流环是 FOC 的地基。地基带宽不够，外面的速度环、位置环都调不好。

### SVPWM：最后一环

SVPWM 的 8 种开关状态、伏秒平衡与母线利用率，见[第 3 卷《异步机与功率电子》](03-induction-power.html)。这里只强调：FOC 的电压指令最终要变成 6 个管子的占空比。SVPWM 比 SPWM 高约 15.5% 的母线利用率。

### 观测器：省掉编码器的代价与办法

反电势观测的基本关系：

$$
e_\alpha=-\omega_e\psi_f\sin\theta_e,\qquad e_\beta=\omega_e\psi_f\cos\theta_e
$$

$$
\theta_e=\arctan\frac{-e_\alpha}{e_\beta}
$$

低速时反电势幅值很小，信噪比差。零速时反电势为零，必须用凸极效应高频注入或初始位置检测。

| 方法 | 核心思想 | 优点 | 弱点 |
| --- | --- | --- | --- |
| 龙伯格观测器 | 线性状态观测 | 简单、易调 | 参数误差敏感 |
| 滑模观测器 SMO | 滑模面强迫误差收敛 | 鲁棒性强 | 抖振 |
| EKF | 噪声统计下的最优估计 | 处理非线性 | 计算量大 |
| MRAS | 参考模型与可调模型比较 | 直观 | 低速精度差 |
| PLL | 锁相环提取角度 | 平滑 | 动态滞后 |

### 滑模：工具，不是门派

滑模控制的设计步骤：

1. 选滑模面 $s(x)=0$。
2. 设计控制律，使 $s\dot s<0$。
3. 系统沿滑模面运动，对参数摄动不敏感。

代价是抖振。工程上用饱和函数、边界层或高阶滑模抑制。

滑模可以做速度环、做电流环、做观测器。它跨电机类型通用，不是某种电机专属。

### MTPA 与弱磁的轨迹规划

| 区域 | 约束 | 电流分配 |
| --- | --- | --- |
| 基速以下 | 电流极限圆 | MTPA：最大转矩电流比 |
| 基速以上 | 电压极限椭圆 | 负 $i_d$ 弱磁 |
| 深度弱磁 | 电压极限与电流极限交点 | MTPV：最大转矩电压比 |

MTPA 追求「同样电流下转矩最大」，弱磁追求「同样电压下转速最高」。两者都在 $i_d$-$i_q$ 平面上做几何优化。

### MTPA 的推导：拉格朗日乘子

MTPA 的目标：在电流幅值固定的条件下，让转矩最大。

转矩：

$$ T=\frac32p\left[\psi_fi_q+(L_d-L_q)i_di_q\right] $$

约束：

$$ i_d^2+i_q^2=I_s^2 $$

构造拉格朗日函数：

$$ \mathcal{L}=T+\lambda\left(i_d^2+i_q^2-I_s^2\right) $$

对 $i_d$、$i_q$ 求偏导并令其为零：

$$ \frac{\partial\mathcal{L}}{\partial i_d}=\frac32p(L_d-L_q)i_q+2\lambda i_d=0 $$

$$ \frac{\partial\mathcal{L}}{\partial i_q}=\frac32p\left[\psi_f+(L_d-L_q)i_d\right]+2\lambda i_q=0 $$

消去 $\lambda$，令 $A=L_d-L_q$：

$$ A\left(I_s^2-2i_d^2\right)=\psi_fi_d $$

整理成二次方程：

$$ 2Ai_d^2+\psi_fi_d-AI_s^2=0 $$

取物理解：

$$ i_d=\frac{\psi_f-\sqrt{\psi_f^2+8(L_q-L_d)^2I_s^2}}{4(L_q-L_d)} $$

$$ i_q=\sqrt{I_s^2-i_d^2} $$

**符号解释**：

- $I_s$ 是电流矢量幅值，单位 A。
- $L_q-L_d>0$ 时，$i_d$ 为负。负 $i_d$ 产生磁阻转矩。
- 表贴式 PMSM 的 $L_d\approx L_q$，分母趋近于零。此时 $i_d\approx0$，只有 $i_q$ 产生转矩。

**几何意义**：在 $i_d$-$i_q$ 平面上，等转矩曲线是双曲线。等电流曲线是圆。MTPA 点是圆与双曲线的切点。

### MTPV：深度弱磁的极限

基速以上，电压极限椭圆随转速升高而收缩。电流圆与电压椭圆的交点给出当前转速下的最大转矩。这就是弱磁轨迹。

转速继续升高，交点会进入 MTPV 段。MTPV 的目标是「同样电压下转矩最大」。轨迹比 MTPA 更靠负 $i_d$。

**三个工作区**：

| 区域 | 主要约束 | 目标 | 轨迹 |
| --- | --- | --- | --- |
| 恒转矩区 | 电流极限圆 | 最大转矩电流比 | MTPA |
| 恒功率区 | 电压极限椭圆 | 维持转矩 | 弱磁 |
| 深度弱磁区 | 电压极限椭圆 | 最大转矩电压比 | MTPV |

**特征电流**：

$$ I_{ch}=\frac{\psi_f}{L_q-L_d} $$

当 $I_{max}>I_{ch}$ 时，理论上可以进入深度弱磁，获得很宽的恒功率区。表贴式电机的 $L_q-L_d$ 很小，$I_{ch}$ 很大，所以弱磁范围窄。

**一句话**：MTPA 管「同样电流下转矩最大」。弱磁管「同样电压下转速最高」。MTPV 是弱磁走到尽头的极限轨迹。

## B FOC 的完整数学模型

### dq 电压方程

$$ u_d=R_si_d+\frac{d\lambda_d}{dt}-\omega_e\lambda_q $$

$$ u_q=R_si_q+\frac{d\lambda_q}{dt}+\omega_e\lambda_d $$

磁链：

$$ \lambda_d=L_di_d+\psi_f $$

$$ \lambda_q=L_qi_q $$

代入电压方程：

$$ u_d=R_si_d+L_d\frac{di_d}{dt}-\omega_eL_qi_q $$

$$ u_q=R_si_q+L_q\frac{di_q}{dt}+\omega_e\left(L_di_d+\psi_f\right) $$

### 转矩

$$ T_e=\frac32p\left(\lambda_di_q-\lambda_qi_d\right) $$

代入磁链：

$$ T_e=\frac32p\left[\psi_fi_q+(L_d-L_q)i_di_q\right] $$

### 状态空间形式

取 $i_d$、$i_q$ 为状态：

$$ \frac{di_d}{dt}=\frac1{L_d}\left[u_d-R_si_d+\omega_eL_qi_q\right] $$

$$ \frac{di_q}{dt}=\frac1{L_q}\left[u_q-R_si_q-\omega_e(L_di_d+\psi_f)\right] $$

**读法**：d 轴与 q 轴各有一个一阶 RL 对象。交叉项是旋转带来的耦合。

### 解耦

前馈补偿：

$$ u_d^*=u_{d,PI}-\omega_eL_qi_q $$

$$ u_q^*=u_{q,PI}+\omega_e\left(L_di_d+\psi_f\right) $$

补偿后：

$$ u_d^*=R_si_d+L_d\frac{di_d}{dt} $$

$$ u_q^*=R_si_q+L_q\frac{di_q}{dt} $$

两个轴可以独立整定。

## C 电流环离散化与数字延迟

### 采样与更新

数字控制每个采样周期 $T_s$ 执行一次：

1. ADC 采样电流。
2. 计算 PI。
3. 更新 PWM 占空比。

采样保持带来约 $0.5T_s$ 延迟。PWM 更新带来约 $0.5T_s$ 延迟。总延迟约 $1.5T_s$。

### 延迟的相位损失

延迟环节：

$$ G_d(s)\approx\frac1{1+1.5T_ss} $$

在带宽 $\omega_c$ 处的相位滞后：

$$ \varphi\approx-\arctan(1.5\omega_cT_s) $$

取 $f_{sw}=10\ \mathrm{kHz}$，$T_s=100\ \mu s$，$f_c=1\ \mathrm{kHz}$：

$$ \varphi\approx-\arctan(1.5\times2\pi\times1000\times100\times10^{-6}) $$

$$ \varphi\approx-\arctan(0.942)=-43^\circ $$

相位裕度被吃掉约 43°。所以电流环带宽通常不超过开关频率的 1/10。

### PI 参数例子

取 $L=0.5\ \mathrm{mH}$，$R=0.1\ \Omega$，$f_c=1\ \mathrm{kHz}$：

$$ \omega_c=2\pi\times1000=6283\ \mathrm{rad/s} $$

$$ K_p=L\omega_c=0.0005\times6283=3.14 $$

$$ K_i=R\omega_c=0.1\times6283=628 $$

**校验**：$K_i/K_p=200=R/L$。零点抵消对象极点。

### 离散化

位置式 PI：

$$ u[k]=K_pe[k]+K_iT_s\sum_{j=0}^{k}e[j] $$

增量式 PI：

$$ \Delta u[k]=K_p\left(e[k]-e[k-1]\right)+K_iT_se[k] $$

增量式天然抗积分饱和，但需要处理输出限幅与回退。

### 采样频率怎么选

| 开关频率 | 采样频率 | 电流环带宽 | 说明 |
| --- | --- | --- | --- |
| 8 kHz | 8~16 kHz | 0.8~1.2 kHz | 通用 |
| 10 kHz | 10~20 kHz | 1~1.5 kHz | 伺服 |
| 20 kHz | 20~40 kHz | 2~3 kHz | 高频 |
| 50 kHz | 50~100 kHz | 5~8 kHz | SiC |

采样频率至少等于开关频率。更高采样可以降低延迟，但增加计算与噪声。

## D DTC 的扇区与开关表

### 扇区

定子磁链矢量在复平面上旋转。六个有效电压矢量把平面分成六个扇区。

- 扇区编号 1~6。
- 每个扇区由两个相邻有效矢量界定。
- 零矢量在中心。

### 滞环控制

- 磁链滞环：比较 $\vert\psi_s\vert$ 与给定，输出 $\pm1$。
- 转矩滞环：比较 $T_e$ 与给定，输出 $\pm1$。
- 两个滞环输出组合，查表选电压矢量。

### 通用开关表

| 磁链误差 | 转矩误差 | 作用 |
| --- | --- | --- |
| 增大 | 增大 | 选超前于磁链的矢量 |
| 增大 | 减小 | 选零矢量或滞后矢量 |
| 减小 | 增大 | 选滞后矢量 |
| 减小 | 减小 | 选零矢量 |

具体矢量取决于扇区。不同厂商的开关表有差异。

### 估算

定子磁链：

$$ \psi_s=\int\left(u_s-R_si_s\right)dt $$

转矩：

$$ T_e=\frac32p\left(\psi_\alpha i_\beta-\psi_\beta i_\alpha\right) $$

**弱点**：纯积分有漂移。低速时 $R_s$ 误差与逆变器非线性造成磁链估算偏差。工程上用低通滤波、漂移补偿或混合观测。

## E 无传感器：从反电势到高频注入

### 反电势法

反电势：

$$ e_\alpha=-\omega_e\psi_f\sin\theta_e $$

$$ e_\beta=\omega_e\psi_f\cos\theta_e $$

角度：

$$ \theta_e=\arctan\frac{-e_\alpha}{e_\beta} $$

**问题**：低速时反电势幅值小，信噪比差。零速时反电势为零。

### 锁相环 PLL

用 $e_\alpha$、$e_\beta$ 构造误差：

$$ \varepsilon=e_\alpha\cos\hat\theta_e+e_\beta\sin\hat\theta_e $$

PLL 调节 $\hat\theta_e$，使 $\varepsilon\to0$。

**优点**：平滑、抗噪。**缺点**：动态滞后。

### 滑模观测器 SMO

电流观测：

$$ \frac{d\hat i_s}{dt}=\frac1{L_s}\left(u_s-R_s\hat i_s-\hat e_s\right) $$

滑模面取电流误差。用符号函数强迫误差收敛。由等效控制提取反电势。

**优点**：鲁棒。**缺点**：抖振。工程上用饱和函数或高阶滑模。

### 高频注入

在 d 轴注入高频电压：

$$ u_{dh}=V_h\cos(\omega_ht) $$

凸极机的 q 轴高频电流幅值与转子位置有关。解调电流幅值即可得到角度。

**适用**：零速与低速。**代价**：噪声、额外损耗、对凸极比敏感。

### 方法对比

| 方法 | 速度范围 | 优点 | 弱点 |
| --- | --- | --- | --- |
| 反电势法 | 中高速 | 简单 | 低速失效 |
| PLL | 中高速 | 平滑 | 动态滞后 |
| SMO | 中高速 | 鲁棒 | 抖振 |
| EKF | 全速 | 噪声最优 | 计算量大 |
| 高频注入 | 零低速 | 零速可用 | 噪声、损耗 |
| 混合法 | 全速 | 覆盖全速 | 切换复杂 |

## F 弱磁轨迹数值例子

### 约束

电流极限：

$$ i_d^2+i_q^2\le I_{max}^2 $$

电压极限：

$$ (L_qi_q)^2+(L_di_d+\psi_f)^2\le\left(\frac{U_{max}}{\omega_e}\right)^2 $$

### 轨迹

| 转速 | 工作点 | 转矩 | 说明 |
| --- | --- | --- | --- |
| 0.5 基速 | MTPA | 最大 | 电流极限 |
| 1.0 基速 | MTPA 到弱磁 | 略降 | 电压接近极限 |
| 1.5 基速 | 弱磁 | 下降 | 电压极限 |
| 2.0 基速 | 深度弱磁 | 快速下降 | MTPV 附近 |

### 数值

沿用第 2 卷的参数：$\psi_f=0.1\ \mathrm{Wb}$，$L_d=0.5\ \mathrm{mH}$，$L_q=0.8\ \mathrm{mH}$，$I_{max}=100\ \mathrm{A}$，$U_{max}=200\ \mathrm{V}$。

- 基速约 1562 rad/s 电角速度。
- 特征电流 333 A。
- 额定电流下 MTPA 转矩约 62.5 N·m。

转速升到 2 倍基速，电压极限椭圆缩短一半。$i_d$ 必须更负，$i_q$ 必须减小。转矩约降到 30 N·m 量级。

**说明**：具体数值取决于参数与饱和。这里给的是趋势与量级。

## G 模型预测与 deadbeat（进阶）

### 模型预测控制 MPC

在每个采样周期，预测未来几步的电流或转矩。用代价函数选最优电压矢量。

代价函数：

$$ J=\sum_{k=1}^{N}\left[\left(i_d^*-i_d[k]\right)^2+\left(i_q^*-i_q[k]\right)^2\right]+\lambda\left\|\Delta u\right\|^2 $$

- $N$ 是预测步长。
- $\lambda$ 是电压变化的权重。

**优点**：多目标、约束处理自然。**缺点**：计算量大、参数敏感。

### Deadbeat 控制

让电流在一个采样周期内到达给定：

$$ u[k]=R_si[k]+L\frac{i^*-i[k]}{T_s}+\omega_e\lambda[k] $$

**优点**：响应最快。**缺点**：对参数与延迟敏感，噪声放大。

### 与 PI 的对比

| 方法 | 带宽 | 参数敏感 | 计算量 | 场景 |
| --- | --- | --- | --- | --- |
| PI | 中 | 低 | 小 | 通用 |
| Deadbeat | 高 | 高 | 中 | 快速电流环 |
| MPC | 高 | 中 | 大 | 多目标、约束 |

**建议**：先用 PI 把系统调稳，再考虑 MPC 或 deadbeat。

## H 调试清单

1. **编码器零位**：d 轴对齐，确认 $\theta_e=0$ 时 $i_d$ 为正。
2. **电流采样偏置**：零电流时 ADC 读数应为中点。
3. **相序**：正转时 $\theta_e$ 递增，$i_q$ 为正。
4. **电流环**：先单轴、低带宽，再提高。
5. **速度环**：先低增益，观察阶跃响应。
6. **解耦**：高速时观察 $i_d$、$i_q$ 是否互相串扰。
7. **弱磁**：逐步升速，观察电压与电流限幅。
8. **保护**：过流、过压、欠压、过热、堵转。
9. **死区补偿**：低速小电流时观察波形。
10. **负载测试**：额定转矩、峰值转矩、温升。

## I 自检题

| 问题 | 一句话答案 |
| --- | --- |
| FOC 的 dq 方程为什么有交叉项？ | 旋转坐标系带来的耦合 |
| 电流环带宽受什么限制？ | 采样与 PWM 延迟 |
| DTC 为什么低速不准？ | 定子电阻误差与纯积分漂移 |
| 反电势法为什么零速失效？ | 反电势与转速成正比 |
| 高频注入靠什么？ | 凸极效应 |
| 弱磁的边界是什么？ | 电流圆与电压椭圆 |
| Deadbeat 为什么参数敏感？ | 它依赖精确模型与延迟 |

---

[← 总览](index.html) · [← 第 3 卷](03-induction-power.html) · [第 5 卷 →](05-waveform.html) · [拆分前单页版](../motor-knowledge-base.html)
