---
template: doc
theme: blueprint
title: 12 · 术语表与 FAQ
subtitle: 看到缩写先查这里；查不到再回图纸第 2 页的机器代号表
source: EPLAN 图纸第 2 页代号表 + 双刀原理报告 + IO 矩阵
---
HQ 图纸里混用英文、德文、BHS 内部代号。先记住三组：设备代号（HQ/SQ/KQ/SR）、功能组（=MPS/=LVS/=KNB）、信号名（Good Cut/STO）。其余按表查。

## A 设备与工艺
| 缩写 | 英文/德文 | 中文 | 说明 |
|---|---|---|---|
| HQ | Cut-off / Querschneider | 横切机 | 双刀高速横切 |
| HQ1/HQ2 | Cut off 1/2 | 横切 1/2 | 两套刀辊单元 |
| SQ | SQ-M+ / SQ-N (cut off) | 单刀横切机 | 一把刀，常见 2×112kW |
| KQ | Rotary Shear / Kurzquerschneider | 旋转剪/短横切 | DF 后、SR 前，做换单缺口 |
| SR | Automatic Slitter Scorer | 自动纵切压痕机 | 纵切/压线，不是旋转剪 |
| NQ | Cut-off / Querschneider | 横切机 | 与 HQ 同属 cut-off |
| DF | Double Facer | 双面机 | 湿端最后一道 |
| AS | Automatic Stacker | 自动堆码机 | 双刀两条出纸路各一台 |
| AOC | Automatic Order Change | 自动换单 | DF/KQ/SR/HQ/AS 协同 |
| CCD | Central Control Desk | 中控台 | 操作/指示 |
| CCS | Corrugator Control System | 瓦线控制系统 | 订单/生产数据 |
| MES | Manufacturing Execution System | 制造执行系统 | 经 CCS/AOC 接口 |
| CFK | Carbon Fiber Reinforced Plastic | 碳纤维刀辊 | 低惯量 |
| FK | Flying Knife | 飞刀/飞剪 | 换单用 |
| CMC | Cut-off Control Computer | 横切电脑 | 信号名沿用旧称 |
| CLPC | Cut Length PC | 切长电脑 | 切长计算 |
| LHD/RHD | Left/Right Hand Drive | 左/右操作侧 | 对应 SV Drive side |

## B 控制与驱动
| 缩写 | 英文 | 中文 | 说明 |
|---|---|---|---|
| PLC | Programmable Logic Controller | 可编程逻辑控制器 | 参考方案 Beckhoff C6015 |
| CU320-2 | SINAMICS S120 Control Unit | S120 控制单元 | 刀辊驱动控制 |
| PM240-2 | SINAMICS G120 Power Module | G120 功率模块 | 刀辊功率级 |
| CUA32 | Control Unit Adapter | 控制单元适配器 | PM240-2 接口 |
| DRIVE-CLiQ | Drive Communication Link | 驱动通讯 | CU320↔PM240/TM120 |
| EtherCAT | Ethernet for Control Automation | 实时以太网 | Beckhoff 主站 |
| PROFINET | Process Field Network | 工业以太网 | 中控/邻机 |
| STO | Safe Torque Off | 安全转矩关断 | 封锁 IGBT 脉冲 |
| SIA/SIB | Safe Input A/B | 安全输入 A/B | i950 双通道 STO |
| TM120 | Siemens Temperature Module | 温度输入模块 | 电机 PTC |
| PTC/TCO | Positive Temperature Coefficient / Thermal Cut-Out | 正温度系数/热开关 | 电机测温/保护 |
| i950 | Lenze i950 Servo Inverter | 伦茨 i950 伺服 | 辅助轴 |
| EPLAN | Electrical CAD | 电气设计软件 | 图纸平台 |

## C 功能组与柜号
| 代码 | 含义 | 页段例子（AISLING SQ-M+） |
|---|---|---|
| =MPS | 主电源/PE/接地 | 10–32 |
| =TPS | 铭牌/额定数据（新 HQ-M） | 7 |
| =SOV | 结构标识总览（新 HQ-M） | 8–12 |
| =POT | 等电位/接地（新 HQ-M） | 17–20 |
| =HQ | 操作/Generally（新 HQ-M） | 116–117 |
| =LDC | 负载控制（新 HQ-M） | 121 |
| =STA | 启动警告（新 HQ-M） | 122 |
| =LVS | 400VAC 配电 | 51–81 |
| =LSV | Load voltage supply；同 =LVS 功能，新代际代码 | 新 SQ-M/部分新 HQ-M |
| =DCV | 24VDC 电源 | 101–131 |
| =ACV | 230VAC 电源 | 201–215 |
| =SCC | 柜内冷却 | 251–255 |
| =RLS | 预充/放电/母线电容/柜灯；旧平台 | 281–282 |
| =STE | 安全回路 | 301–380 |
| =PLC | PLC/IO | 401–420 |
| =SDC | 驱动控制单元；旧平台（新平台用 Lenze 9400） | 427 |
| =DEX | 信号交换 | 503–575 |
| =OIL | 油泵 | 601–610 |
| =VEL | 纸板速度/脉冲 | 701–721 |
| =SPD | 接头检测 | 750 |
| =INF | 进纸 | 1090–1195 |
| =KNB | 刀辊 | 1251–1390 |
| =OUS | 出料站（皮带/真空/毛刷/卡纸） | 1500–1695（旧 SQ-M+/ARAMIS） |
| =OUF | 出料辊（辊/间隙/阀） | 1500–1695（SQ-M/新 HQ-M） |
| =WEV | 排废 | 1700–1750 |
| =JAM | 卡纸 | 1811 |
| =CMC | 横切电脑/色标 | 1920–1952（选配） |
| =VAC | 真空 | 675/801（部分项目） |
| =WBE | 废料输送带（KQ-M） | 34–35（ROCH/SAMANTHA KQ） |
| =IDP | 铭牌/额定数据（KQ-M） | 7 |
| =SOV | 结构标识说明（KQ-M） | 8–12 |
| +13501/11/31/41 | SQ-M+ 或新 HQ-M 柜组 | SQ-M+：进线/控制/出料/面板；新 HQ-M：供电/控制/HQ1/HQ2；看项目 |
| +13511（单柜） | SQ-N 紧凑型 | 控制/驱动/安全全在一柜 |
| +13505/15/25/45 | 旧双刀 HQ-M 柜组 | 进线/HQ1/HQ2/控制 |
| +13515/+13545 | 新 SQ-M 单刀柜组 | 控制/驱动 + 电源/PLC |
| +13715 | 操作箱（旧） | 现场操作/急停 |
| +13700 | 控制面板柜（新 HQ-M） | 替代 +13715 |
| +13090 | 电机冷却（SQ-N 双柜型） | CAMBRIA/CELESTINE/AUDRIC |

## D 常用信号
| 信号 | 中文 | 说明 |
|---|---|---|
| Good Cut to AS1/AS2 | 有效剪切 | 80ms 脉冲，堆码计数 |
| HQ1/HQ2 cut impulse | 剪切脉冲 | 每转一次，跟踪 |
| Ejecting Waste HQ1/HQ2 | 排废 | 废板标识 |
| Cuts Quantity Adjust | 张数调整 | 运行中修正 |
| AOC Running | 换单运行 | 状态 |
| KQ nx/1x cut | KQ 剪切 | 换单缺口 |
| SR Knives Changeover | SR 换刀 | 纵切换单 |
| SR Speed | SR 速度 | 0–20mA / 0–500m/min |
| DF Acceleration is Inhibited | 禁止 DF 加速 | HQ 到极限 |
| Charge/Discharge Contactor On | 充/放电接触器 | 预充/泄放 |
| STO_A/STO_B | 安全转矩关断 | PM240-2 |
| QUICK.STOP | 快速停机 | CU320-2 |

## E EPLAN 设备代号
| 字母 | 含义 | 例子 |
|---|---|---|
| Q | 电流通断 | -10Q1 主开关 |
| F | 保护 | -51F1 熔断器 |
| K | 信号处理 | -301K1 安全继电器 |
| M | 电机 | -251M1 风扇 |
| T | 能量转换 | -1300T1 变频器 |
| U | 母排/固定 | -10U3 PE 母排 |
| X | 端子 | -XPE、-X24V |
| Y | 阀门/执行器 | -1090Y1 进纸阀 |
| W | 电缆 | -WC461、-WP13001 |
| S | 开关/传感器 | -380S1 接近开关 |
| P | 测量 | -106P20 压力开关 |
| R | 电阻 | -1032R1 放电电阻 |
| G | 电源 | -101G1 24V 电源 |
| A | 组件/机架 | -405A1 PLC 机架 |
| B | 传感器/盒 | -321B1 |
| C | 储能 | 电容组 |

> 设备标签规则：`-<页号><字母><序号>`，如 `-1300T1` 在第 1300 页。端子 `-X…` 和电缆 `-W…` 不遵守页号前缀。

## F 高频 FAQ
| 问题 | 答案 |
|---|---|
| SQ-M+ 和 HQ-M 差在哪？ | SQ-M+ 单刀、1 套 HQ1、3 个主柜（部分 +13541）；HQ-M 双刀、HQ1+HQ2、4 柜 |
| SQ-M 和 SQ-M+ 差在哪？ | SQ-M 是新单刀平台，用 13515/13545 柜，页数 184–203；SQ-M+ 用 13501/11/31/41，页数 233–252 |
| 同机型为什么配置不同？ | 幅宽、主传动、刀梁/刀辊、柜冷、电气标准、选配都不同 |
| 2×112kW 是两台横切机吗？ | 不是，是一套上刀辊两端各一台电机；下刀杆机械联动 |
| KQ 和 SR 是什么？ | KQ 旋转剪；SR 自动纵切压痕机 |
| LHD/RHD 是什么？ | 左/右操作侧，对应 SV Drive side |
| SV 里 None 是什么意思？ | 未填/不适用，不等于客户明确不要 |
| BOM 里 E/I 是什么？ | 电气件包/安装材料分支，展开后才是具体物料 |
| 为什么 BOM 电气行有 2000 多？ | 柜体装配包（E_135xx）下含电缆、端子、驱动、柜体件 |
| 图纸页号和 PDF 页码为什么差？ | 图框页号是 EPLAN 页号，PDF 页码是阅读器页码 |
| 书签写 13505，结构是 13501？ | SQ-M+ 模板旧柜号残留，以 `+` 结构标识为准 |
| BOM relevant 是什么？ | 该位置物料是否释放到 SAP |
| 一份图纸多个 Item 怎么办？ | 按 Item 分别挂 SO Position，不能一刀切 |
| 物料号查不到怎么办？ | 查 SAP 主数据/工厂/有效期，不要随便选替代 |
| 安全信号能短接/强制吗？ | 不能，双通道短接会使安全功能失效 |
| 现场调试先看什么？ | 安全链、STO、Good Cut、主接触器反馈 |

## G 快速判断
| 你看到 | 结论 |
|---|---|
| 图纸有 `==HQ2` | 双刀 HQ-M |
| 柜号 13505/15/25/45 | 旧双刀 HQ-M |
| 柜号 13501/11/31/41 | SQ-M+ 或新 HQ-M（看功能组） |
| 柜号 13515/13545 | 新 SQ-M 单刀 |
| 功能组有 `=KQ` | 旋转剪，不是 HQ |
| 只有 `=HQ1` | 单刀 |
| `-1300T1` + `-2300T1` | 两套刀辊驱动 |
| `E_135xx_X` | 柜内驱动/控制模块 |
| `8DI_I200` | 安全输入，EL1918 |
| `16DO_O100` | 标准输出，EL2809 |

> 英语不熟练时，先看 [32 图纸英语入门](32-english-basics.html) 和 [33 页标题中英对照](33-english-page-titles.html)；本页只负责缩写和术语。

## 导航
[← 上一页：11 项目实例](11-case-studies.html) · [知识库首页](index.html) · [下一页：13 资料索引 →](13-resources.html)
