---
template: doc
theme: blueprint
title: 33 · 页标题中英对照：按功能组查
subtitle: 电源、控制、安全、驱动、进出料、接口、布局；看到页名就知道在哪
source: 26 份 EPLAN 图纸的 Page tree / Page list 页标题
---
这一页按功能组分，不按字母。先记住你常去的功能组，再记该组的高频页名。图纸原词有拼写错误，表中保留原样，并在备注里给正确拼写。

## A 电源与配电
| 图纸英文 | 中文 | 备注 |
|---|---|---|
| 24VDC power supply | 24VDC 电源 | 常带 `(Driver)` |
| 24VDC power supply + distribution | 24VDC 电源与分配 | 功能组页名 |
| main power supply | 主电源 | 进线 |
| main power supply for HQ1 | HQ1 主电源 | 双刀有 HQ2 |
| 400VAC power distribution | 400VAC 配电 | 主配电 |
| 230VAC power supply - HQ1 | 230VAC 电源 - HQ1 | 变压器后 |
| PE terminal | PE 端子 | 接地 |
| PE termianl for rail connect | 导轨连接 PE 端子 | `termianl` 应为 terminal |
| grounding connect | 接地连接 | 柜体接地 |
| charge/discharge contactor | 充/放电接触器 | 预充/放电 |
| charge unit | 充电单元 | 电容预充 |
| capacitors unit | 电容组 | 直流母线 |
| discharge resistor | 放电电阻 | 停机泄放 |
| DC bus | 直流母线 | 驱动供电 |
| potential distribution | 电位分配 | 等电位 |
| external power supply 24VDC for cabinet | 柜外 24VDC 电源 | 远程柜 |
| external power connect - HQ1 | HQ1 外接电源 | 现场电源 |
| oil pump power supply | 油泵电源 | 润滑 |
| oil pump power control | 油泵电源控制 | 接触器 |
| vacuum unit power supply | 真空单元电源 | 选配 |
| vacuum unit power control | 真空单元电源控制 | 选配 |
| air conditioner 13515 | 13515 柜空调 | 柜冷 |
| cooling fan | 冷却风扇 | 柜冷/电机 |
| cabinet light | 柜灯 | 照明 |
| service socket | 检修插座 | 230V |
| output power | 输出功率 | 电源模块 |
| temperature switch connect | 温度开关接线 | 电机测温 |

## B 控制、PLC 与网络
| 图纸英文 | 中文 | 备注 |
|---|---|---|
| PLC - 401A1-K1 | PLC - 401A1-K1 | IPC 站 |
| BECKHOFF PLC overview | Beckhoff PLC 总览 | PLCV |
| BECKHOFF IO overview | Beckhoff IO 总览 | PLCV |
| DI 100 - 405A1-K100 | 数字输入 100 - 卡 K100 | 16DI |
| DO 100 - 405A1-K200 | 数字输出 100 - 卡 K200 | 16DO |
| AQ 140 - 405A1-K400 | 模拟输出 140 - 卡 K400 | 4AO |
| Encoder - 405A1-K500 | 编码器 - 卡 K500 | EL5102 |
| FDI200 - 405A1-K10 | 安全数字输入 200 - 卡 K10 | TwinSAFE |
| FDO - DO200 405A1-K20 | 安全数字输出 200 - 卡 K20 | TwinSAFE |
| Ethernet switch | 以太网交换机 | 网络 |
| BECKHOFF switch | Beckhoff 交换机 | 网络 |
| control unit CU 320-2 | 控制单元 CU320-2 | 旧驱动 |
| main controller (OS) | 主控制器（操作侧） | 刀梁 |
| main controller (DS) | 主控制器（驱动侧） | 刀梁 |
| SMC 20 for OS motor | OS 电机 SMC20 | 编码器模块 |
| SMC 20 for DS motor | DS 电机 SMC20 | 编码器模块 |
| extension servo | 扩展伺服 | 辅助轴 |
| control servo | 控制伺服 | 辅助轴 |
| pulse distribution - knife bar speed | 刀梁速度脉冲分配 | 编码器 |
| pulse distribution - measuring roll speed | 测量辊速度脉冲分配 | 编码器 |
| resolver connect for gap 1 controller | 间隙 1 控制器旋变接线 | 出料 |
| resolver connect for gap 2 controller | 间隙 2 控制器旋变接线 | 出料 |
| controller extend module 1600K2 interface | 控制器扩展模块 1600K2 接口 | 出料 |
| relay module | 继电器模块 | 接口 |
| Ethernet module | 以太网模块 | 网络 |
| power for extend module | 扩展模块电源 | 24V |
| Overview of buses Profinet | Profinet 总线总览 | 网络 |
| Overview of buses CAN | CAN 总线总览 | 网络 |

## C 安全
| 图纸英文 | 中文 | 备注 |
|---|---|---|
| main module for internal estop | 内部急停主模块 | 安全继电器 |
| main module for controller sto | 控制器 STO 主模块 | 安全 |
| safety door - infeed | 进料安全门 | 门开关 |
| safety door - outfeed | 出料安全门 | 门开关 |
| safety door - waste | 废料安全门 | 门开关 |
| safety door - infeed DS | 进料驱动侧安全门 | DS |
| safety door - outfeed DS | 出料驱动侧安全门 | DS |
| operating button - estop | 操作按钮 - 急停 | 操作箱 |
| relay for safety door | 安全门继电器 | 门链 |
| STO (HQ1) | HQ1 安全转矩关断 | 驱动 |
| knife bar | 刀梁（上刀辊+下刀杆） | =KNB |
| top knife bar / bottom knife bar | 上刀杆/下刀杆 | 机械图 |
| blade bar | 刀杆 | 专利/机械 |
| tool limit switch | 刀架限位开关 | 安全 |
| Tool Limit Switch | 刀架限位开关 | 标题大写 |
| safety control for network valve | 网络阀安全控制 | 安全泄压 |
| FDI200 - 405A1-K10 | 安全输入 200 - K10 | EL1918 |
| FDI201 - 405A1-K11 | 安全输入 201 - K11 | EL1904 |

## D 驱动、电机与编码器
| 图纸英文 | 中文 | 备注 |
|---|---|---|
| main contactor for knife bar controllers (HQ1) | 刀梁控制器主接触器（HQ1） | 主接触器 |
| main contactor | 主接触器 | 驱动供电 |
| charge/discharge contactor | 充/放电接触器 | 预充 |
| knife bar encoder | 刀梁编码器 | 刀辊反馈 |
| measuring roll encoder | 测量辊编码器 | 板速 |
| main controller | 主控制器 | 刀梁 |
| main motor cooling system | 主电机冷却系统 | 风冷/水冷 |
| HQ1 main motor cooling | HQ1 主电机冷却 | 冷却 |
| motor fan control | 电机风扇控制 | 接触器 |
| release motor brake | 释放电机抱闸 | 抱闸 |
| servo | 伺服 | 辅助轴 |
| knife edge lubrication | 刀口润滑 | 选配 |
| oil return pump control | 回油泵控制 | 油泵 |
| outfeed belt 1 controller | 出料皮带 1 控制器 | 出料 |
| outfeed belt 2 controller | 出料皮带 2 控制器 | 出料 |
| outfeed roll 1 controller | 出料辊 1 控制器 | 出料 |
| outfeed roll 2 controller | 出料辊 2 控制器 | 出料 |
| outfeed roll gap 1 controller | 出料辊间隙 1 控制器 | 间隙 |
| outfeed roll gap 2 controller | 出料辊间隙 2 控制器 | 间隙 |
| infeed roll controller | 进料辊控制器 | 进料 |
| HQ1 infeed roll up/down | HQ1 进料辊升/降 | 气动 |
| outfeed roll valve up/down | 出料辊阀升/降 | 气动 |
| outfeed station gap control | 出料站间隙控制 | OUS |
| Gap control controller | 间隙控制控制器 | 出料 |
| Steel Brush Control-outfeed | 出料钢刷控制 | 清刷 |

## E 进料、出料、废料、卡纸与真空
| 图纸英文 | 中文 | 备注 |
|---|---|---|
| infeed unit paper exist | 进料单元有纸 | 纸存在 |
| outfeed station | 出料站 | OUS |
| outfeed roll | 出料辊 | OUF |
| waste discharge controller (OS) | 废料排放控制器（操作侧） | 排废 |
| waste discharge controller (DS) | 废料排放控制器（驱动侧） | 排废 |
| paper jam sensor - infeed | 卡纸传感器 - 进料 | JAM |
| paper jam sensor - outfeed | 卡纸传感器 - 出料 | JAM |
| paper jam sensor - outfeed above | 卡纸传感器 - 出料上方 | JAM |
| paper jam sensor - outfeed below | 卡纸传感器 - 出料下方 | JAM |
| splice detection | 纸板接头检测 | SPD |
| vacuum unit power supply | 真空单元电源 | VAC |
| vacuum unit power control | 真空单元电源控制 | VAC |
| laser measuring unit - HQ1 | 激光测速单元 - HQ1 | VEL |
| AOC light | AOC 灯 | 换单指示 |
| Paper jam monitor - HQ1 | HQ1 卡纸监视 | JAM |
| outfeed station gap control | 出料站间隙控制 | OUS |
| waste discharge controller | 废料排放控制器 | WEV |

## F 接口、交换与操作
| 图纸英文 | 中文 | 备注 |
|---|---|---|
| 13545 -> 15511(exchange) | 13545 → 15511 信号交换 | AS |
| 13545 -> 18619(exchange) | 13545 → 18619 信号交换 | CCD |
| 13545 -> 12511(exchange) | 13545 → 12511 信号交换 | SR |
| 13545 -> 02511(e-stop) | 13545 → 02511 急停 | DF |
| 13545 -> 02511(KQ, exchange) | 13545 → 02511 KQ 交换 | KQ |
| 13511 -> HQ - AS-M | 13511 → HQ - AS-M | 堆码 |
| 13511 -> HQ - CCD | 13511 → HQ - CCD | 中控 |
| 13511 -> HQ - DF | 13511 → HQ - DF | 双面机 |
| 13511 -> HQ/AOC - AS-M | 13511 → HQ/AOC - AS-M | 换单 |
| 13511 -> HQ/AOC - SR | 13511 → HQ/AOC - SR | 换单 |
| operating button 13715 <-> 13545 | 操作按钮 13715 ↔ 13545 | 操作箱 |
| operating button | 操作按钮 | 面板 |
| operating panel - 13715 | 操作面板 - 13715 | 旧面板 |
| relay for laser measuring unit - HQ1 | HQ1 激光测速继电器 | VEL |
| feedback from 400VAC switch | 400VAC 开关反馈 | 反馈 |

## G 布局、报表、EPLAN 与图框
| 图纸英文 | 中文 | 备注 |
|---|---|---|
| cabinet layout | 柜体布置图 | LAY |
| base plate layout | 底板布置图 | LAY |
| enclosure legend | 箱柜设备清单 | BOM 报表 |
| terminal diagram | 端子图 | CON |
| cable diagram | 电缆图 | WRE |
| PLC overview | PLC 总览 | PLCV |
| network summary | 网络总览 | BUSV |
| layout | 布置图 | LAY |
| plug diagram | 插头图 | PLG，KQ |
| Multi-line | 多线图 | 表示类型 |
| Single-line | 单线图 | 表示类型 |
| Panel layout | 柜内布置图 | 表示类型 |
| Overview | 总览 | 表示类型 |
| Page tree | 页树 | 书签 |
| Page list | 页列表 | 书签 |
| Device tree | 设备树 | 书签 |
| Device tag list | 设备标签列表 | 书签 |
| Circuit diagram | 电路图 | WDA |
| General information | 通用信息 | GEN |
| Title page / cover sheet | 标题页/封面 | 书签 |
| Previous page | 上一页 | 图框 |
| Next page | 下一页 | 图框 |
| Page | 页 | 图框 |
| Location plant | 位置/工厂 | 图框 |
| Function group | 功能组 | 图框 |
| Structure identifier | 结构标识 | SOV |

## H 拼写变体与德英混写
| 图纸原词 | 正确/含义 | 备注 |
|---|---|---|
| siwtch | switch | 拼写错误 |
| termianl | terminal | 拼写错误 |
| impluse | impulse | 拼写错误 |
| realy | relay | 拼写错误 |
| messuring | measuring | 拼写错误 |
| EntherNET / Enthert | Ethernet | 拼写错误 |
| Paarquerverweis | pair cross-reference | 德语 |
| Allpolig | all-pole | 德语，全极 |
| Einpolig | single-pole | 德语，单极 |
| Schaltschrankaufbau | cabinet layout | 德语 |
| Typenschild | name plate | 德语，铭牌 |
| Sicherheitstechnik | safety technology | 德语 |
| Abfallausschleusung | waste ejection | 德语 |
| Abfallbänder | waste belts | 德语 |

> 看到不认识的词，先判断是英语、德语还是拼写错误；再按功能组猜上下文。不要因为一个拼写错误就否定整页。

## 导航
[← 上一页：32 英语入门](32-english-basics.html) · [知识库首页](index.html) · [下一页：34 短语与短句 →](34-english-phrases.html)
