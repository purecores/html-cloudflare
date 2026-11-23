---
template: doc
theme: blueprint
title: 41 · 从 SV 到基线模板：新订单改图总流程
subtitle: 先读 Checklist，再定基线项目，最后按配方改页；这是整条工作链的主干
source: HQ横切项目Checklist汇总.xlsx · 26 份 HQ-PDF · 22 份 BOM · Tem-Color-PDF 模板
---
这一页回答新人最常问的问题：拿到一个 HQ 订单，从哪份图纸开始改，改哪些页，改完怎么核对。答案固定在五步：读 Checklist、定基线、做差异清单、改 EPLAN、核对并释放。

## A 五步主干
```flow LR
(SV/Checklist) -> 配置画像 -> 基线模板
基线模板 -> 差异清单 -> EPLAN改图 -> 三方核对 -> ILC释放
```

| 步 | 输入 | 输出 | 判据 |
|---|---|---|---|
| 1 读 Checklist | SAP Checklist 截图或汇总表 | 配置画像 15 项 | 每项都有值或标记 |
| 2 定基线 | 机型家族、控制平台、柜号代际 | 1 个主参照 + 1 个备选 | 页树相似度最高 |
| 3 差异清单 | 两份 Checklist 逐项比 | 差异页/器件/端子/电缆/BOM | 每项能落到页号 |
| 4 改 EPLAN | 差异清单 + 源项目 | 新项目、报表、PDF | 交叉引用无空 |
| 5 核对释放 | 图纸、BOM、Checklist | 三方一致的订单 | 冲突已书面确认 |

## B 第 1 步：读 Checklist 的 15 项画像
| # | Checklist 字段 | 画像结论 | 影响 |
|---|---|---|---|
| 1 | Machine Type | HQ-M / SQ-M+ / SQ-M / SQ-N | 单双刀、页数、柜数 |
| 2 | Control | Beckhoff / Lenze（Siemens PLC） | PLC、安全、总线整套 |
| 3 | Working Width | 2200 / 2500 / 2800 / 3150 / 3350 | 机架、刀梁、出线长度 |
| 4 | Drive side (paper going) | Left / right → LHD / RHD | 布置图镜像、电缆长度 |
| 5 | Placement | 1 / 1+2 | 横切单元数 |
| 6 | Main Drive 1/2 | 2x45 / 2x60 / 2x112kW / 53kW | 驱动模块、进线、电缆 |
| 7 | Main drive cooling | air / water / liquid | 冷却回路、监测 |
| 8 | Knife Bar 1/2 | Steel / CFK / Steel sleeve + g/m² | 惯量、功率余量 |
| 9 | Frame | Simplex / Duplex 925 | 与 Placement 互相印证 |
| 10 | Infeed / outfeed | Twin-roll / One-roll；EP / pneumatic；Outfeed station | IO 点、阀、电机 |
| 11 | Cabinet cooling | air cooled / water cooled | SCC 页、空调或热交换器 |
| 12 | Waste evacuation | 空 / HQ-1 / HQ-1+2 | WEV 页数 |
| 13 | Splice / Laser / CMC | Yes / 空 | SPD、VEL、CMC 页 |
| 14 | Electrical standard | EU / CN / UL | 变压器、名称牌、线色、认证 |
| 15 | Special Variants 与 Deviation | 文字条目 | 逐条评估，常改电气 |

> Checklist 只给配置，不给页号。第 2–5 步才是电气工作。

> Details 页签的 Electrical standard 常被截图裁掉。缺这一项时，先看 RS-X 配置表或 BOM 名称牌物料号。

## C 第 2 步：基线模板选择
先按家族选，再按控制平台选，最后按柜号代际选。三者都对上，页树才能逐页对照。

| 家族 | 控制平台 | 柜号代际 | 推荐基线 | 页数 |
|---|---|---|---|---|
| SQ-M+ | Beckhoff | 13501/11/31/41 | AZARIA / BRISEIS | 234 |
| SQ-M+ 无 Splice | Beckhoff | 13501/11/31/41 | ANWEN | 233 |
| SQ-M+ 含 CMC+真空 | Beckhoff | 13501/11/31/41 | ANSEL | 249 |
| SQ-M+ 含 KQ 接口 | Beckhoff | 13501/11/31/41 | AISLING | 238 |
| SQ-M | Beckhoff | 13515/13545 | CASSIAN / SVENA / VELJANA | 184–203 |
| SQ-N 单柜 | Beckhoff | 13511 | ATARA / AZIEL / AURELIO | 144–159 |
| SQ-N 双柜 | Beckhoff | 13511/13531 | CAMBRIA / CELESTINE / AUDRIC | 184–190 |
| HQ-M 旧 Beckhoff | Beckhoff | 13505/15/25/45 | DALIAH / ARAMIS / ARLEN | 336–373 |
| HQ-M 过渡 Lenze | Lenze PLC | 13505/15/25/45 | SAMANTHA / ANDREAS / SAANA | 335–421 |
| HQ-M 新 EU | S7-1500F | 13501/11/31/41 | ADARA / BELEN / ROCH | 381–398 |

| 第二判据 | 看什么 | 例子 |
|---|---|---|
| 主传动 | 功率、同步/异步、并联/单驱 | 2x45 对 2x60 差一个驱动档 |
| 选配组合 | SPD / VEL / WEV / VAC / CMC | 页数差 1–15 页 |
| 电气标准 | EU / CN / UL | 变压器、名称牌、认证 |
| 特殊变体 | 文字条目 | 刀型、车速、线槽、废料车 |

> 页数只用于初筛，不能当判据。SAANA 335 页与 DALIAH 336 页，标题相似度只有 0.48。

> 新平台不能用旧平台当基线。SQ-M 与 SQ-M+ 的页标题相似度 0.29–0.32。

## D 第 3 步：差异清单模板
| 维度 | 记录什么 | 例 |
|---|---|---|
| 页 | 新增/删除/替换；EPLAN 页号与 PDF 页 | SPD 750 新增 |
| 器件 | 标签、物料号、柜内位置 | -750B2 171641.04 |
| 端子 | 端子排、端子号、附件 | -XSPD 1/2/3 |
| 电缆 | 电缆号、型号、长度、起止 | -W13366 60 m |
| IO | 模块、地址、通道 | K140 I140.4 |
| BOM | 新增/删除行、层级、数量 | 5 行 |
| 安全 | 是否触及急停/门/STO | 本题不触及 |

## E 第 4 步：改图顺序
```flow LR
复制页 -> 改页名与页号
改页名与页号 -> 改设备标签
改设备标签 -> 更新交叉引用
更新交叉引用 -> 补端子与电缆
补端子与电缆 -> 重生成报表
重生成报表 -> 导出PDF
```

| 顺序 | 动作 | 检查点 |
|---|---|---|
| 1 | 复制完整功能页 | 页名、结构、页号正确 |
| 2 | 改设备标签 | 前缀等于主功能页 |
| 3 | 更新交叉引用 | 无空引用、无问号 |
| 4 | 补端子、电缆、线号 | CON/WRE 有行 |
| 5 | 重生成 LAY/PLCV | 箱柜清单行数对 |
| 6 | 导出 PDF | 页数、书签、图框对 |

> 复制页只完成一半。端子、电缆、报表、BOM 必须同步改。

## F 第 5 步：三方核对
| 核对 | 图纸 | BOM | Checklist |
|---|---|---|---|
| 机型与柜号 | 页树 `==HQ1/2`、`+135xx` | E_135xx 分支 | Machine Type |
| 主传动 | KNB 页驱动与电机 | SERVOMOTOR/CONVERTER 行 | Main Drive |
| 选配 | 功能组是否存在 | 传感器/电缆行 | OPTIONS |
| 电气标准 | 名称牌、变压器 | 名称牌物料号 | Electrical standard |
| 特殊变体 | 对应页或注释 | 对应物料 | Special Variants |

> 三方冲突时先停手。以书面确认的配置为准，并在变更记录里写明依据。

## G SV 变化 → 改图配方（速查）
| SV 变化 | 图纸改什么 | BOM 改什么 |
|---|---|---|
| 单刀→双刀 | 增加 `==HQ2` 全套页与 2xxx 段 | 增加 HQ2 柜与驱动分支 |
| 2x45→2x60kW | KNB 驱动 132→200kW、接触器升档 | 模块、电缆换料 |
| 异步→112kW 同步 | 每刀 1 模块变 2 模块、水冷 | 电机、SMC20、冷却件 |
| 风冷→水冷柜 | SCC 页换空调/热交换器 | 空调、水流检测换料 |
| 加 Splice | SPD 750、XSPD、2 根电缆 | 传感器、端子箱、电缆 |
| 加 Laser | VEL 701–721、EL5102 | 激光头、控制器、电缆 |
| 加 CMC | CMC 6 页、DEX 585/590、PLCV 2 页 | 传感器、伺服、阀、电缆 |
| 加 Waste | WEV 1700–1780（每套） | 翻板伺服、废料带、熔断器 |
| 加门锁 | STE 318/325/360–363 | 门锁继电器、锁、电缆 |
| EU→CN | 名称牌、变压器、线色 | 名称牌物料号换标准 |
| 400→480V/60Hz | MPS 电压、201T1 抽头、UL 熔断器 | UL 认证件、线径 |
| LHD→RHD | 布置图镜像、OS/DS 电缆互换 | 电缆长度、支架 |

> 每个选配都跨至少 2 个文档块：WDA 电路、CON 端子、WRE 电缆、LAY 清单。只复制电路页一定漏。

## H 停手清单
- 改安全链、STO、急停、门锁、安全继电器。
- 改主传动功率、驱动型号、电机数量。
- 改柜体、母排、电容、预充、直流母线。
- 改 EU/CN/UL 标准、电压等级、认证。
- 改双刀/单刀架构、柜号体系。
- 改客户接口协议：DF、SR、AS、KQ、堆码机。
- 参考项目找不到先例，或三方数据冲突未确认。

> 触及以上任一条，停手找师傅，并留下书面差异记录。

## 导航
[← 上一页：40 Checklist 矩阵](40-checklist-matrix.html) · [知识库首页](index.html) · [下一页：42 EPLAN 导航 →](42-eplan-navigation.html)
