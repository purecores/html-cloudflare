---
template: doc
theme: blueprint
title: 03 · 电气架构与供电：从进线到 STO
subtitle: 五个供电功能组、四个柜体、三条链路；先建立骨架，再看单页
source: AISLING SQ-M+ / ARAMIS HQ-M 图纸功能组 + Beckhoff IO 矩阵
---
HQ 的电气系统可以拆成三条链路：能量链（400VAC→驱动→电机）、控制链（24VDC→PLC→IO→现场）、安全链（急停/门→安全 IO→STO）。三条链都画在同一套图纸里，靠功能组区分。

## A 三条链路
```flow LR
(400VAC进线) -> =MPS主供电
=MPS主供电 -> =LVS配电
=LVS配电 -> 主接触器
主接触器 -> 主传动驱动
主传动驱动 -> 刀梁电机

(24VDC) -> =DCV电源
=DCV电源 -> =PLC控制
=PLC控制 -> =DEX整线接口

(急停/门) -> =STE安全
=STE安全 -> 安全输出
安全输出 -> STO
```

## B 功能组：图纸的五个供电章节
| 功能组 | 名称 | AISLING 图框页 | 内容 | 关键器件 |
|---|---|---|---|---|
| =MPS | Main Power Supply | 10–32 | 主进线、PE、接地 | 主开关、PE 端子 |
| =LVS | 400VAC distribution | 51–81 | 400VAC 分配、主接触器 | 断路器、接触器、熔断器 |
| =DCV | 24VDC supply + distribution | 101–131 | 24VDC 电源与分配 | 电源模块、断路器 |
| =ACV | 115/230VAC supply | 201–215 | 230VAC 电源、插座、照明 | 变压器、插座回路 |
| =SCC | Cabinet cooling unit | 251–255 | 柜体冷却/风扇/空调 | 风扇、空调、温控 |
| =RLS | Release related parts | 281–282 | 柜灯、柜内插座、释放件 | 灯、插座 |
| =STE | Security related parts | 301–380 | 安全回路、急停、门 | 安全继电器/安全 IO |
| =PLC | PLC | 401–420 | Beckhoff PLC、IO 模块 | EL 系列模块 |
| =SDC | Simotion drive control | 427 | 驱动控制单元 | CU 320-2 |
| =DEX | Signal exchange | 503–575 | 与 DF/SR/AS 的信号交换 | 端子、继电器、总线 |
| =OIL | Oil pump | 601–610 | 油泵供电 | 电机、接触器 |
| =VEL | Cardboard speed | 701–721 | 激光测速、编码器 | 激光传感器 |
| =SPD | Splice detection | 750 | 拼接检测 | 传感器 |
| =VAC | Vacuum | 801–802 | 真空泵电源（部分项目） | 真空泵 |

> 上表是 AISLING SQ-M+ 的实际页段。不同项目会增加/删除功能组，例如 ARAMIS HQ-M 多出 `=VAC`，双刀多出一整套 `==HQ2`。
>
> 代号先分清：KQ = Rotary Shear 旋转剪；SR = Automatic Slitter Scorer 自动纵切压痕机；HQ = Cut-off 横切机。SR 不是旋转剪。

## C 柜体：谁装什么
| 单刀 SQ-M+ / SQ-N | 旧双刀 HQ-M | 主要功能 | 典型功能组 |
|---|---|---|---|
| +13501 进线柜 | +13505 进线柜 | 主进线、400VAC 主开关、230VAC、柜冷、柜灯 | =MPS、=LVS、=ACV、=SCC、=RLS |
| +13511 控制柜 | +13515 HQ1 柜 | 400VAC 分配、24VDC、安全、PLC、DEX、HQ1 驱动 | =MPS、=LVS、=DCV、=STE、=PLC、=DEX、=KNB |
| +13531 出料/废料柜 | +13525 HQ2 柜 | 400VAC 分配、24VDC、柜冷、出料/废料、HQ2 驱动 | =MPS、=LVS、=DCV、=SCC、=DEX、=KNB |
| +13541 附加/扩展柜（部分，功能待确认） | +13545 控制/接口柜 | PLC、整线接口、HQ1 刀梁（旧） | =PLC、=DEX、=STE |
| +13715 操作箱 | +13715 操作箱 | 现场操作、急停；新 HQ-M 改为 +13700 | =STE |

> 柜号随单刀/双刀整体切换。阿联酋 HQ-M 的 BOM 是 `E_13505/E_13515/E_13525/E_13545`；山东恒升/越南 SQ-M+ 是 `E_13501/E_13511/E_13531/E_13541`。

> 新 HQ-M（ADARA/BELEN/ROCH）还出现 `=TPS、=SOV、=POT、=HQ、=LDC、=STA` 等功能组，旧表未列；含义待新项目报告确认。

> 2025–2026 新增项目打破了这个简单对应。SQ-M（CASSIAN/SVENA/VELJANA）用 13515/13545 单刀柜；新 HQ-M（ADARA/BELEN/ROCH）用 13501/11/31/41 双刀柜，并出现 `=TPS/=SOV/=POT/=HQ/=LDC/=STA` 等新功能组。

> 先看机型+柜号+功能组三件事，不要只按单/双刀推柜号。

| 新平台 | 柜号角色 |
|---|---|
| 新 HQ-M（ADARA/BELEN/ROCH） | +13501 供电柜、+13511 控制柜、+13531 HQ1 功率柜、+13541 HQ2 功率柜、+13700 面板柜 |
| 新 SQ-M（CASSIAN/SVENA/VELJANA） | +13515 控制/驱动柜、+13545 电源/PLC 柜 |
| SQ-N 紧凑型（ATARA/AZIEL/AURELIO） | 只有 +13511；AURELIO 另有 +13711/+13730 远程箱 |
| SQ-N 双柜型（CAMBRIA/CELESTINE/AUDRIC） | +13511 +13531 +13090 |

## D 能量链：主传动
| 环节 | 典型配置 | 图纸位置 | 备注 |
|---|---|---|---|
| 进线 | 400VAC 3Ph + PE | =MPS | 主开关、PE 排 |
| 分配 | 断路器/接触器 | =LVS | 主接触器给刀梁驱动 |
| 驱动 | 变频器/伺服 | =SDC 或驱动页 | 2 台电机各一台驱动 |
| 电机 | 2x45kW 异步 / 2x112kW 同步 / 2x60kW | =KNB | 每套上刀辊 2 台；下刀杆机械联动 |
| 反馈 | 编码器/旋变 | =VEL / =KNB | 切长与同步 |
| 安全 | STO | =STE | 安全输出到驱动 STO |

```flow LR
=LVS --> 主接触器 --> 驱动1 --> 电机1
=LVS --> 主接触器 --> 驱动2 --> 电机2
编码器 --> 驱动1
编码器 --> 驱动2
=STE安全 --> STO
```

> 2x 表示一个刀梁两台电机。双刀机型有两套。具体功率以 SV 的 Main Drive 和 Cut length diagram 为准。

## E 控制链：24VDC 与 PLC
| 层级 | 器件 | 作用 |
|---|---|---|
| 24VDC 电源 | =DCV 电源模块 | 给 PLC、IO、传感器、继电器供电 |
| 控制器 | Beckhoff PLC / CU 320-2 | 逻辑、运动、订单管理 |
| 标准 IO | EL 系列 DI/DO/AI/AO | 现场按钮、阀、传感器 |
| 安全 IO | EL1918 / EL1904 / EL2904 | 急停、门、STO |
| 通信 | EtherCAT / PROFINET | 与驱动、整线 PLC 通信 |

## F 安全链：不要把它当普通 IO
```flow LR
(急停按钮) -> 双通道输入
(门开关) -> 双通道输入
双通道输入 -> 安全输入模块EL1904
安全输入模块EL1904 -> 安全PLC逻辑
安全PLC逻辑 -> 安全输出EL2904
安全输出EL2904 -> 主传动STO
安全输出EL2904 -> DF/SR/AS停机
```

| 信号 | 方向 | 典型模块 | 说明 |
|---|---|---|---|
| 内部急停 | 输入 | EL1904 | 柜内/操作箱急停 |
| 门开关 | 输入 | EL1918 | 进料/出料门，双通道 |
| 外部急停（DF/AS） | 输入 | EL1904 | 整线急停链 |
| STO 主传动 | 输出 | EL2904 | 主驱动安全转矩关断 |
| Stop-Safe to DF | 输出 | EL2904 | 停双面机 |
| Stop-Safe to safety center | 输出 | EL2904 | 整线安全中心 |

> 安全信号必须双通道核对。图纸上同一信号的 OS/DS（Open/Closed Side）两路要分别落到模块的两个通道。

## G 辅助与整线接口
| 系统 | 功能组 | 作用 | 订单变化点 |
|---|---|---|---|
| 柜冷 | =SCC | 风扇/空调/水冷 | water cooled / air cooled |
| 油泵 | =OIL | 刀梁/液压润滑 | 机型与刀梁 |
| 测速 | =VEL | 激光/编码器测纸速 | Laser speed measurement 选配 |
| 拼接检测 | =SPD | 检测纸接头 | Splice Detection 选配 |
| 真空 | =VAC | 真空吸附/输送 | 部分项目 |
| 整线接口 | =DEX | 与 DF、SR、AS、MES 交换信号 | 客户接口、整线标准 |

## H 机型差异
| 项目 | 单刀 SQ-M+ | 双刀 HQ-M | 说明 |
|---|---|---|---|
| HQ 单元 | 1 套 | 2 套 | 双刀多一套 INF/KNB/OUS/WEV/JAM |
| 主传动 | 2 台电机 | 4 台电机 | 每套上刀辊 2 台 |
| 柜体 | SQ-M+ 13501/11/31/41；SQ-M 13515/13545 | 旧 HQ-M 13505/15/25/45；新 HQ-M 13501/11/31/41 | 柜号随代际变化 |
| 安全页 | 9 页 | 10 页 | 双刀增加 HQ2 安全 |
| 整线接口 | DEX 14 页 | DEX 17 页 | 双刀信号更多 |

## 导航
[← 上一页：02 双刀原理](02-duplex-principle.html) · [知识库首页](index.html) · [下一页：04 图纸阅读 →](04-eplan-reading.html)
