---
template: sheet
theme: blueprint
title: BHS HQ 横切机 · 电气订单处理知识库
subtitle: 从校招新员工到独立处理 HQ 订单 · 26 份 EPLAN 图纸、22 份 BOM、26 单 Checklist、Beckhoff IO 表与 ILC 教程
source: BHS Corrugated · HQ Cut-off · EPLAN P8 2025
cols: 2
---
先读「认识 HQ」，再学「读图纸」和「读 SV」，然后按「改图总流程」动手。每页可独立查阅，页底有上一页/下一页。

## A 四周上手路径 {span=2}
```flow LR
(入职) -> 认识HQ: 第1周
认识HQ -> 读图纸
读图纸 -> 读SV与Checklist: 第2周
读SV与Checklist -> 读BOM
读BOM -> 改图总流程: 第3周
改图总流程 -> 实战任务: 第4周
实战任务 -> 独立处理订单
```

## B 第一周先读这 6 页
| 顺序 | 页面 | 你会得到 |
|---|---|---|
| 1 | [01 认识 HQ](01-hq-overview.html) | 产线位置、单双刀、五个机型家族 |
| 2 | [03 电气架构](03-electrical-architecture.html) | 三条链路、功能组、柜号 |
| 3 | [04 EPLAN 图纸阅读](04-eplan-reading.html) | 四棵树、页名语法、页号段 |
| 4 | [41 改图总流程](41-template-selection.html) | 五步主干、15 项画像、配方表 |
| 5 | [40 Checklist 矩阵](40-checklist-matrix.html) | 26 单配置与同机型差异 |
| 6 | [42 EPLAN 导航](42-eplan-navigation.html) | 真实页号跳转演示 |

## C 知识库地图
| 区块 | 页面 | 你会得到 |
|---|---|---|
| 入门 | [01 认识 HQ](01-hq-overview.html) | 产线位置、单刀/双刀、机型谱系 |
| 入门 | [02 单刀与双刀原理](02-duplex-principle.html) | 上下刀杆、运动公式、电容组 |
| 电气系统 | [03 电气架构与供电](03-electrical-architecture.html) | 三条链路、功能组、柜号代际 |
| 电气系统 | [04 EPLAN 图纸阅读](04-eplan-reading.html) | 四棵树、页名语法、BOM 在哪 |
| 电气系统 | [05 Beckhoff IO 与信号](05-beckhoff-io.html) | 40 模块、安全通道、PN 通信 |
| 订单配置 | [06 SV 需求规格](06-sv-requirements.html) | 逐项读 SV、12 项电气影响 |
| 订单配置 | [07 BOM 结构](07-bom-structure.html) | 20 列、层级、E/I 分支 |
| 订单配置 | [08 项目差异矩阵](08-project-matrix.html) | 五家族、柜号代际、复用顺序 |
| 订单配置 | [40 Checklist 矩阵](40-checklist-matrix.html) | 26 单逐行配置、冲突清单 |
| 流程实战 | [09 订单处理 SOP](09-order-workflow.html) | 七步流程、核对表、升级点 |
| 流程实战 | [41 改图总流程](41-template-selection.html) | Checklist→基线→改图→核对 |
| 流程实战 | [10 EPLAN→SAP ILC](10-sap-ilc.html) | 释放 BOM 分步操作与截图 |
| 流程实战 | [11 三项目实例复盘](11-case-studies.html) | SV+BOM+图纸对照 |
| 流程实战 | [42 EPLAN 导航](42-eplan-navigation.html) | 电位箭头、触点映像、报表回跳 |
| 流程实战 | [43 三方核对](43-bom-crosscheck.html) | 22 份 BOM、冲突清单、核对流程 |
| 图纸深读 | [14 能力评估](14-readiness.html) | L1/L2/L3、允许/禁止、评审门 |
| 图纸深读 | [15 400V 主回路](15-400v-power.html) | 进线、开关、熔断器、母排、PE |
| 图纸深读 | [16 24V 与 230V](16-24v-control.html) | 电源模块、分配、负载分组 |
| 图纸深读 | [17 安全与 STO](17-safety-ste.html) | 急停、门、LOTO、双通道 |
| 图纸深读 | [18 PLC 与 IO](18-plc-io.html) | CPU、模块、地址、PLCV |
| 图纸深读 | [19 驱动与电机](19-drives-motors.html) | 45/60/112kW、预充、制动 |
| 图纸深读 | [20 传感器](20-sensors.html) | 测速、拼接、卡纸、废料 |
| 图纸深读 | [21 整线接口](21-dex-interface.html) | DF/SR/AS/CCD/KQ、硬线/PN |
| 图纸深读 | [22 端子与电缆](22-terminals-cables.html) | 端子排、电缆号、线号、BOM |

## D 进阶与速查
| 主题 | 页面 | 你会得到 |
|---|---|---|
| 改图方法 | [23 从变更到改图](23-modification-workflow.html) | 七步法、三个案例、停手清单 |
| 检查表 | [24 改图检查表](24-review-checklist.html) | 52 项检查、五道评审门 |
| EPLAN 操作 | [25 改图操作手册](25-eplan-operations.html) | 复制页、改标签、端子、报表 |
| 选型计算 | [26 电气选型计算](26-selection-calculation.html) | 24V/400V/驱动/预充/制动 |
| 变更案例 | [27 图纸变更案例库](27-change-cases.html) | 门锁、真空、安全中心、堆码 |
| 变更同步 | [28 变更同步与归档](28-change-closure.html) | 图纸→BOM→SAP→PDF→归档 |
| 考核 | [29 上岗考核](29-assessment.html) | 20 题、5 实操、30/60/90 天 |
| 实战 1 | [30 ANWEN 加 Splice](30-training-task.html) | 单页变更、真实答案 |
| 实战 2 | [31 AZARIA 加 CMC+真空](31-training-task-2.html) | 15 页、4 个文档块 |
| 速查 | [44 一页纸速查](44-quick-reference.html) | 流程、页号段、ILC 八步 |

## E 深入专题与图纸英语
| 主题 | 页面 | 你会得到 |
|---|---|---|
| 主驱动选型 | [38 主驱动总表](38-drive-selection.html) | 各机型电机/驱动、电流余量 |
| Beckhoff 模块 | [39 模块与信号](39-beckhoff-modules-signals.html) | 为什么十几二十个模块 |
| 英语入门 | [32 图纸英语入门](32-english-basics.html) | 10 句型、80 核心词 |
| 页标题 | [33 页标题中英对照](33-english-page-titles.html) | 按功能组查页名 |
| 短语 | [34 短语与短句](34-english-phrases.html) | 信号、SV、IO、BOM 短句 |
| 图框字段 | [35 图框与 EPLAN 字段](35-english-fields-eplan.html) | 封面字段、书签、代号 |
| 英语自测 | [36 英语自测](36-english-quiz.html) | 40 词、20 短语、30 天计划 |
| BOM 词汇 | [37 BOM 物料词汇](37-english-bom-vocab.html) | 紧固件、材料、标准 |

## F 术语与资料
| 主题 | 页面 | 你会得到 |
|---|---|---|
| 术语/FAQ | [12 术语表与 FAQ](12-glossary-faq.html) | 缩写、功能组、设备代号 |
| 资料索引 | [13 资料索引](13-resources.html) | 26 PDF、22 BOM、模板、IO 表 |
| 说明 | [45 数据源与维护](45-data-scope.html) | 版本、口径、待确认项 |

## G 数据源与范围 {span=2}
| 数据源 | 内容 | 用途 |
|---|---|---|
| HQ-PDF（26 份） | EPLAN P8 2025 导出图纸，10 HQ-M / 7 SQ-M+ / 3 SQ-M / 6 SQ-N | 图纸结构、页号、项目差异 |
| BOM（22 份） | SAP 导出 xlsx，行数 22–4473 | 物料结构、E/机械分界 |
| Checklist（26 单 93 图） | SAP 特征截图 + 汇总表 | 订单配置画像 |
| Tem-Color-PDF（5 份） | 3 份主模板 + 2 份彩色参考导出 | 基线模板与颜色规范 |
| HQ IO 矩阵 V3.3 | Beckhoff 输入输出表 | 模块、地址、安全信号 |
| ILC 教程 | EPLAN→SAP 释放 BOM | 订单交付流程 |
| RS-X 配置清单 | 湿端/接纸机配置表 | 整线上下文，非 HQ 本体 |

## H 使用约定
> 机型统一写 SQ-M+、SQ-M、SQ-N、HQ-M。页码写「功能组/柜号/页号」，例如 `=MPS/+13501/10`。物料号保留 SAP 原格式。标注「待确认」的条目，必须回图纸、SV 或 BOM 复核后才能用于生产。冲突不解决不释放。
