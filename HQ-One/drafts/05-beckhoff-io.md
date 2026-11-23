---
template: doc
theme: blueprint
title: 05 · Beckhoff IO 与信号：从地址到现场
subtitle: 输入/输出两张表、安全与标准两套编号、PROFINET 两向映射
source: HQ IO_Beckhoff_Matrix_V3.3.xlsx · Beckhoff IO / PN_Com
---
IO 表是电气与软件的接口合同。它告诉你“哪个信号进哪个模块的哪个通道”，图纸告诉你“这个通道接到哪个端子、哪根电缆”。两边必须对得上。

## A 一张表怎么读
| 列 | 含义 | 例子 |
|---|---|---|
| Content | 功能分类/选配 | Safety、General、HQ2 exist (Option) |
| Module | 模块序号与型号 | DI1 (EL1918)、DO1 (EL2904) |
| Address | PLC 地址 | 8DI_I200、16DO_O100 |
| Terminal | 端子号 | 1、2、3… |
| Contact | 触点/通道 | 1、2、3… |
| Function Description | 信号名 | Door infeed OS channel#1 |
| Remarks | 备注 | Option、Reserve |

> 左半张是 Input，右半张是 Output。同一个“DI5”可能出现两次：安全区 DI5 和标准区 DI5，型号与地址不同，不能混用。

## B 模块清单
| 类别 | 型号 | 数量 | 地址范围 | 用途 |
|---|---|---|---|---|
| 安全输入 8 通道 | EL1918 | 1 | 8DI_I200 | 门开关双通道 |
| 安全输入 4 通道 | EL1904 | 5 | 4DI_I201–I205 | 急停、LOTO、安全中心 |
| 安全输出 4 通道 | EL2904 | 2 | 4DO_O200–O201 | STO、Stop-Safe |
| 标准输入 16 通道 | EL1809 | 11 | 16DI_I100–I110 | 按钮、反馈、邻机信号 |
| 标准输出 16 通道 | EL2809 | 11 | 16DO_O100–O110 | 阀、灯、接触器、邻机 |
| 模拟输入 2 通道 | EL3002 | 1 | 2AI_PIW120 | 刀速、DF 速度 |
| 模拟输出 4 通道 | EL4074 | 4 | 4AQI_PQW130–170 | 压力/速度给定 |
| 模拟输出 2 通道 | EL4002 | 1 | 2AQI_PQW150 | 第三方速度给定 |
| 编码器接口 | EL5102 | 3 | EC_130/150/160 | 测量辊、刀辊、激光 |
| 高速计数 | EL1258 | 1 | 16DI_I140 | 剪切脉冲、铝带检测；实际 8 通道，地址写法是 16DI |

> 数量是 V3.3 矩阵的配置上限。实际项目按 Option 裁剪，例如 HQ2 模块只在双刀项目出现。
>
> AISLING SQ-M+ 实际只装约 16 个 I/O 模块，标准 I/O 用 EL1409/EL2409，而不是表中的 EL1809/EL2809；地址语法和信号命名相同，型号必须按订单核对。

## C 安全 IO：双通道是硬要求
| 信号 | 模块 | 地址 | 端子对 | 说明 |
|---|---|---|---|---|
| 进料门 OS 通道 1/2 | DI1 EL1918 | 8DI_I200 | 1/2、9/10 | 门开 → 安全停机 |
| 进料门 DS 通道 1/2 | DI1 EL1918 | 8DI_I200 | 3/4、11/12 | 驱动侧门 |
| 出料门 OS 通道 1/2 | DI1 EL1918 | 8DI_I200 | 5/6、13/14 | 操作侧门 |
| 出料门 DS 通道 1/2 | DI1 EL1918 | 8DI_I200 | 7/8、15/16 | 驱动侧门 |
| AS-M 急停 通道 1/2 | DI2 EL1904 | 4DI_I201 | 1/2、5/6 | 堆码机急停 |
| DF 急停 通道 1/2 | DI2 EL1904 | 4DI_I201 | 3/4、7/8 | 双面机急停 |
| SR 门急停 通道 1/2 | DI3 EL1904 | 4DI_I202 | 1/2、5/6 | 纵切机门 |
| 废料门 通道 1/2 | DI3 EL1904 | 4DI_I202 | 3/4、7/8 | 废料区门 |
| LOTO 通道 1/2 | DI4 EL1904 | 4DI_I203 | 1/2、5/6 | 上锁挂牌 |
| 本地急停按钮 | DI4 EL1904 | 4DI_I203 | 3/4 | 单通道 |
| 刀架限位 | DI4 EL1904 | 4DI_I203 | 7/8 | Tool Holder |
| 安全中心急停 1/2 | DI5 EL1904 | 4DI_I204 | 1/2、5/6 | 选配 |
| 安全中心 Stop 1/2 | DI5 EL1904 | 4DI_I204 | 3/4、7/8 | 选配 |
| 操作箱急停 1/2 | DI6 EL1904 | 4DI_I205 | 1/2、5/6 | EU/安全中心配置 |
| 刀架限位 1/2 | DI6 EL1904 | 4DI_I205 | 3/4、7/8 | EU/安全中心配置 |

| 信号 | 模块 | 地址 | 端子对 | 说明 |
|---|---|---|---|---|
| Stop-Safe to DF | DO1 EL2904 | 4DO_O200 | 1/2 | 停双面机 |
| STO（无 DO2 时） | DO1 EL2904 | 4DO_O200 | 3/4 | 驱动 STO |
| Stop-Safe to safety center | DO1 EL2904 | 4DO_O200 | 5/6 | 停整线 |
| Valve network pressure | DO1 EL2904 | 4DO_O200 | 7/8 | 安全泄压 |
| Main drive STO | DO2 EL2904 | 4DO_O201 | 1/2 | EU 配置 |
| ELSE Drive STO | DO2 EL2904 | 4DO_O201 | 3/4 | EU 配置 |

> 端子对相邻，但过程位不按端子顺序：EL1904 是 1/2→bit0、5/6→bit1、3/4→bit2、7/8→bit3；EL1918 是 1/2→bit0、9/10→bit1、3/4→bit2、11/12→bit3…。不要按端子号推 bit 号。
>
> 安全逻辑不在 I/O 表里：EL1918/EL1904/EL2904 只负责采集/输出，真正的急停链、门监控、STO 逻辑在安全程序/安全继电器（`-366K1`、`-320K1`、`-305K1`）中。

## D 标准 IO：按功能分组
| 功能组 | 典型信号 | 模块/地址 |
|---|---|---|
| 面板/操作 | AOC Start、HQ On、Reset、Cuts Quantity Adjust | 16DI_I100–I103 |
| 驱动反馈 | 主接触器反馈、充电反馈、冷却器反馈 | 16DI_I102–I104 |
| 邻机接口 | DF On、DF Speed up/down、SR/AS Ready | 16DI_I100–I105 |
| HQ2 选配 | HQ2 主接触器、HQ2 卡纸、HQ2 门锁 | 16DI_I105–I106 |
| 刀辊/剪切 | Cut pulse、刀辊编码器、铝带检测 | 16DI_I140 / EC_130 |
| 输出-剪切 | Good Cut to AS（80ms 脉冲） | 16DO_O100 端子1 / 16DO_O103 端子1（HQ2） |
| 输出-阀 | 进料辊升降、排废翻板、压紧 | 16DO_O101–O103 |
| 输出-辅助 | 油泵接触器、刀口润滑 | 16DO_O102 |
| 输出-邻机 | 换单给 SR、速度给定、停机消息 | 16DO_O101/O108 |
| 选配 | CMC、门锁、真空泵、Fanfold | 16DO_O108–O110 |

## E 模拟量与编码器
| 信号 | 模块 | 地址 | 说明 |
|---|---|---|---|
| 刀速（CLPC） | EL3002 | 2AI_PIW120 | 0–10V/4–20mA，按模块组态 |
| DF 速度 | EL3002 | 2AI_PIW120 | 单机 HQ 才用 |
| 进料/出料压力给定 | EL4074 | 4AQI_PQW130/140/160/170 | 比例阀 |
| SR 速度给定 | EL4074 | 4AQI_PQW130 | 0–20mA / 0–500 m/min |
| 第三方速度给定 | EL4002 | 2AQI_PQW150 | Unifold/ASRS |
| 测量辊 HQ1 | EL5102 | EC_130 | 切长基准 |
| 刀辊 HQ1 | EL5102 | EC_130 | 同步/凸轮 |
| HQ2 测量辊/刀辊 | EL5102 | EC_150/160 | 双刀第二套 |
| 激光测速 | EL5102 | EC_150 | Laser speed measurement 选配 |

## F 地址怎么对上图纸
```flow LR
IO表信号 --> 模块型号 --> 柜内端子
柜内端子 --> 电缆 --> 现场设备
现场设备 --> 图纸页: =STE / =KNB / =DEX
```

| 步骤 | 在 IO 表 | 在图纸 |
|---|---|---|
| 1 | 找到信号名，例如 Main drive STO | 打开 `=STE` 安全页 |
| 2 | 记下模块/地址：EL2904 / 4DO_O201 | 找 `-2904` 或 STO 端子 |
| 3 | 看通道 1/2 | 对应端子号与芯线号 |
| 4 | 看 Remarks 是否 Option | 确认本项目是否配置 |
| 5 | 用设备标签反查 | Device tag list 找所有页 |

## G PROFINET 映射：S7 与 Lenze 各说什么
| 方向 |  sheet | 主要内容 |
|---|---|---|
| S7 → Lenze | PN_Com(S7_to_Lenze) | 订单数据、切长、目标张数、换单类型、速度给定 |
| Lenze → S7 | PN_Com(Lenze_to_S7) | 实际切长、实际张数、状态、故障、AOC 遥测 |

| 关键变量 | 方向 | 含义 |
|---|---|---|
| current_order_info.w_cutlength | S7→Lenze | 当前订单切长 |
| current_order_info.dw_target_cuts | S7→Lenze | 当前订单目标张数 |
| next_order_info.w_cutlength | S7→Lenze | 下一订单切长 |
| b_order_change_done | Lenze→S7 | 换单完成 |
| w_actual_cutlength | Lenze→S7 | 实际切长 |
| dw_actual_cuts | Lenze→S7 | 实际张数 |
| faults.b_estop_active | Lenze→S7 | 急停状态 |
| aoc_call.aoc.* | 双向 | AOC 换单遥测 |

> 表名里的 S7 是遗留角色称呼；AISLING 项目实际主控是 Beckhoff C6015，Lenze 是 HQ 的切长/运动控制器。落地时按订单确认主站，不要按表名猜。

## H 订单变化时 IO 表怎么变
| 变化 | 影响的模块/信号 | 检查点 |
|---|---|---|
| 单刀→双刀 | HQ2 的 DI/DO 模块、HQ2 STO、HQ2 编码器 | 是否加 EL1904/EL2809/EL5102 |
| 加 CMC | DI12/DO10 | CMC 选配信号 |
| 加门锁 | DO11 | 安全门锁输出 |
| 加真空 | DO12 | 真空泵阀 |
| 加 Fanfold | DI13/DI14 | Fanfold 就绪/接收 |
| 客户标准 EU/CN | 安全模块、急停链 | 认证与接线标准 |
| 第三方接口 | AO3/DI15 | Unifold/ASRS 速度与就绪 |

## I 易错点
| 现象 | 原因 | 处理 |
|---|---|---|
| 同一 DI5 两个型号 | 安全区/标准区各自编号 | 看 Address 和 Content |
| 地址 I200 与 I100 混 | 安全输入与标准输入分开 | 先分安全/标准 |
| Option 信号现场没有 | 本项目未选配 | 看 Remarks 与 SV |
| 通道号与端子号不一致 | 端子 1–16 对应 8 通道双线 | 以 IO 表 Terminal 为准 |
| 图纸找不到模块 | 模块在 `=PLC` 概览页 | 用 Device tag list 搜型号 |

> 实际模块数量与信号分组见 [39 模块与信号](39-beckhoff-modules-signals.html)。

## 导航
[← 上一页：04 图纸阅读](04-eplan-reading.html) · [知识库首页](index.html) · [下一页：06 SV 解读 →](06-sv-requirements.html)
