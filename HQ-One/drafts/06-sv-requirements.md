---
template: doc
theme: blueprint
title: 06 · SV 需求规格：订单的第一份“配置合同”
subtitle: 逐项读懂 Characteristic Value，判断它改图纸还是改 BOM
source: HQ横切项目Checklist汇总.xlsx · Checklist 截图 · SV_原始顺序_干净表格.xlsx
---
SV（Specification / 需求特征表）就是 SAP 里的 Checklist。它有三个页签：Checklist、Details、Info。它不写物料号，但决定图纸和 BOM 的大部分分叉。读 SV 的目标只有一个：把每一行翻译成「电气上改什么」。

## A SV 在流程中的位置
```flow LR
(销售订单) -> SV需求表
SV需求表 -> EPLAN项目图纸
EPLAN项目图纸 -> BOM/ILC
BOM/ILC -> SAP生产
SAP生产 -> 调试/交付
```

| 角色 | 用 SV 做什么 |
|---|---|
| 销售/项目 | 确认客户选配、交付范围 |
| 电气 | 判断图纸模板、柜体、驱动、IO |
| 机械 | 判断幅宽、框架、刀梁、进出料 |
| 采购/生产 | 通过 BOM 继承 SV 的结果 |

## B 表结构与读法
| 区块 | 内容 | 读法 |
|---|---|---|
| BASIC MACHINE | 机型、幅宽、操作侧、控制、柜冷、AOC | 决定整机骨架 |
| OPTIONS | 排废、拼接检测、激光测速、Cut-to-mark | 决定选配回路 |
| CORRUGATOR OPTIONS | TAB、整线选配 | 决定接口 |
| SPECIAL / Special Variants | 客户特殊要求 | 逐条确认，常改电气 |
| ⇒ CONFIRM CONF | 配置已确认 | 不是选配 |
| ⇒ DEVIATION FROM STANDARD | 偏离标准 | 必须重点看 |
| Electrical standard | EU / CN / UL | 决定元器件标准与认证 |
| Details 页签 | 电标、纸高、堵纸、导板、柜冷、堆码、编码器 | 补充细节，常被截图裁掉首行 |
| Info 页签 | 功能位置、6 项颜色 RAL | 颜色与整线归属 |
| 安装/颜色 | 纸高、柜冷方式、堆码、颜色 | 机械/现场为主，电气需接口 |

> 三种空值的含义不同，见下表。空白不等于客户明确不要。

| 写法 | 含义 | 处理 |
|---|---|---|
| 空白 | 界面存在但未填 | 回销售确认 |
| `[无此项]` | 该机型没有这个字段 | 不适用 |
| `[截图未含首行]` | 截图被裁 | 补拍或查 RS-X |
>
> SV 的 `No` 或空白也不一定等于 BOM 没有该硬件：Jam detection=No 可能只是软件功能未启用；Laser 空白但图纸有 `=VEL`（DALIAH/AZARIA 都有）。判断配置要同时看 SV、图纸、BOM。

> 全部 26 单的配置矩阵见 [40 Checklist 矩阵](40-checklist-matrix.html)。本节的三项目表是历史样本，用于讲读法。

## C BASIC MACHINE：三个项目逐项对照
| 特征 | 阿联酋 20539256 | 山东恒升 20543109 | 越南 20553680 |
|---|---|---|---|
| Machine Type | HQ-M (Beckhoff) | SQ-M+ | SQ-M+ |
| Working Width | 2500 mm | 3350 mm | 2800 mm |
| Drive side | right | Left | Left |
| Control | Beckhoff | Beckhoff | Beckhoff |
| Cabinet cooling | water cooled | air cooled | air cooled |
| integrated AOC | Yes | Yes | Yes |
| Placement | 1 + 2 | 1 | 1 |
| Cut length diagram | HQ V02/WW2500/45KW/STEEL1500 | 350/WW3350/112KW/CFK1800 | 300/WW2800/112KW/CFK1800 |
| Main Drive（每套上刀辊） | 2x45kW (Asynchron) | 2x112kW (Synchron) | 2x112kW (Synchron) |
| Main drive cooling | air cooled | water cooled | liquid cooled |
| Knife Bar（每套） | Steel 1500 g/m² | CFK 1800 g/m² | CFK 1800 g/m² |
| Knife | double serrated / reclining | double serrated / reclining | double serrated / reclining |
| Jam detection | No | Yes | Yes |
| Frame | Duplex 925 | Simplex | Simplex |
| Infeed | Twin-roll / pneumatic pressure | Twin-roll / EP automatic | Twin-roll / EP automatic |
| Outfeed | double motor / motor gap control | Outfeed station / load control | Outfeed station / load control |
| Electrical standard | EU | CN | CN |
| Cooling switch cabinets | front-mounted water-cooling | top-mounted air-cooling | top-mounted air-cooling |
| Stacker | AS-A, 2800 mm | None | None |
| Encoder paper web | None | Wheel + Laser | Wheel + Laser |
| Production site | Shanghai | None | None |

## D 电气影响最大的十二项
| SV 项 | 取值 | 电气改什么 | 图纸位置 |
|---|---|---|---|
| Machine Type | HQ-M / SQ-M+ / SQ-N | 单刀/双刀、柜号、页数 | `==HQ1`、`==HQ2` |
| Working Width | 2500 / 2800 / 3350 | 机架、刀梁、出料、柜体尺寸 | 机械为主，电气随柜体 |
| Drive side | Left / Right | LHD/RHD、柜体与操作箱位置 | 图框、布置图 |
| Control | Beckhoff | PLC/IO 平台 | `=PLC` |
| Cabinet cooling | water / air | 柜冷回路、空调/水冷 | `=SCC` |
| integrated AOC | Yes | 换单接口、DEX 信号 | `=DEX` |
| Placement | 1 / 1+2 | 横切单元数量/布置 | `==HQ1/2` |
| Cut length diagram | …/45KW/STEEL1500 | 驱动功率、刀梁材质 | `=KNB` |
| Main Drive | 2x45kW / 2x112kW | 电机、驱动、进线 | `=LVS`、`=KNB` |
| Main drive cooling | air / water / liquid | 电机冷却、管路、监测 | `=KNB` |
| Knife Bar | Steel / CFK | 惯量、加减速、功率 | `=KNB` |
| Electrical standard | EU / CN | 元器件标准、认证、线色 | 全图 |

## E OPTIONS 与 SPECIAL
| 选项 | 三个项目的取值 | 电气影响 |
|---|---|---|
| Waste evacuation | 阿联酋 None；山东/越南 HQ-1 | 排废翻板、废料输送、IO |
| Splice Detection | 仅越南 Yes | 拼接传感器、DEX 信号 |
| Laser speed measurement | 仅山东 Yes | 激光测速、EL5102 |
| CUT TO MARK CONTROL | 三项目均 None | 若选配，增加标记传感器与切标控制 |
| Special Variants | 山东：普通齿形刀；越南：300mpm、Dry-End 线槽、附加废料车 | 逐条改机械/电气 |
| ⇒ DEVIATION FROM STANDARD | 三项目均 None | 若不为空，必须逐条评估 |

## F 三个项目差在哪
| 结论 | 证据 |
|---|---|
| 阿联酋是双刀 HQ-M | Frame=Duplex 925，Placement=1+2，2x45kW/刀 |
| 山东/越南是单刀 SQ-M+ | Frame=Simplex，Placement=1，2x112kW |
| 阿联酋用 EU 标准、水冷柜 | Electrical standard=EU，front-mounted water-cooling |
| 山东/越南用 CN 标准、风冷柜 | Electrical standard=CN，top-mounted air-cooling |
| 越南选配最多 | Splice Detection=Yes，3 条 Special Variants |
| 山东有激光测速 | Laser speed measurement=Yes，Encoder=Wheel+Laser |
| 三项目都带 AOC | integrated AOC=Yes |

## G SV 变了，图纸/BOM 哪里变
| SV 变化 | 图纸变化 | BOM 变化 |
|---|---|---|
| 单刀→双刀 | 增加 `==HQ2` 全套页；柜号改 13505/15/25/45（旧平台） | 增加 `E_13525` 等 HQ2 电气分支 |
| 2x45kW→2x112kW | `=KNB` 电机/驱动页改型 | E_135xx 下伺服电机、驱动模块换料 |
| 水冷→风冷 | `=SCC` 柜冷页改 | 空调/水冷件、管路、风扇换料 |
| EU→CN | 元器件标准、线色、认证页改 | 电气件物料号换标准 |
| 加激光测速 | 增加 `=VEL` 激光页 | 增加激光传感器、EL5102 |
| 加拼接检测 | 增加 `=SPD` 页 | 增加传感器、电缆 |
| 加 AOC | `=DEX` 增加换单信号 | 增加接口模块/继电器 |

## H 读 SV 的检查清单
| 检查 | 通过标准 |
|---|---|
| 机型与框架一致 | Machine Type 与 Frame（Simplex/Duplex）不矛盾 |
| 幅宽与切长图一致 | Cut length diagram 的 WW 与 Working Width 一致 |
| 主传动与刀梁一致 | 功率/数量与 Knife Bar 材质匹配 |
| 操作侧与图框一致 | Drive side 与 LHD/RHD 一致 |
| 电气标准与柜冷一致 | EU/CN 与 Cooling switch cabinets 匹配 |
| 选配逐条落地 | 每个 Yes 都能在图纸/BOM 找到对应物 |
| 特殊变体有说明 | Special Variants 文字可执行，不是模糊描述 |
| 偏离标准已确认 | DEVIATION 不为空时，有书面确认 |

## 导航
[← 上一页：05 Beckhoff IO](05-beckhoff-io.html) · [知识库首页](index.html) · [下一页：07 BOM 结构 →](07-bom-structure.html)
