---
template: doc
theme: blueprint
title: 13 · 资料索引与延伸阅读
subtitle: 每份源文件在哪、怎么用；按图索骥，不做「记忆型工程师」
source: D:/Code/Share/HQC4
---
知识库的事实来自以下六类资料。遇到争议，先回源文件核对，再改本库。

## A 一页看清资料地图
| 资料 | 位置 | 数量 | 作用 | 频率 |
|---|---|---|---|---|
| EPLAN 图纸 | `HQ-PDF/` | 26 份 | 项目电气事实的最终依据 | 每天 |
| SAP BOM | `BOM/` | 22 份 | 物料结构、SAP 物料号 | 每单 |
| Checklist 截图 | `Checklist/` | 93 张 | 订单配置画像 | 每单 |
| Checklist 汇总 | `HQ横切项目Checklist汇总.xlsx` | 26 单 | 全量配置矩阵 | 每单 |
| SV 原始表 | `SV/SV_原始顺序_干净表格.xlsx` | 3 单 | 历史样本对照 | 查阅 |
| 3401 BOM | `SV/<项目>/3401.xlsx` | 3 份 | 历史 BOM 快照 | 查阅 |
| 主模板 | `Tem-Color-PDF/` | 3 份 | 派生新项目的起点 | 每单 |
| 彩色参考 | `Tem-Color-PDF/` | 2 份 | 颜色与页树核对 | 查阅 |
| Beckhoff IO 矩阵 | `HQ IO_Beckhoff_Matrix_V3.3.xlsx` | 3 sheet | 模块、地址、信号 | 经常 |
| ILC 教程 | `Parts list creation with EPLAN.docx` | 25 图 | 释放 BOM 的操作 | 每单 |
| RS-X 配置 | `RS-X configuration list.xlsx` | 10 sheet | 湿端整线上下文 | 查阅 |
| 既有深度页 | `HTML/` | 9 页 | 双刀原理、信号、减速 | 查阅 |

## B 26 份 EPLAN 图纸
> 26 份 PDF 覆盖 26 个订单；4 份 KQ-M 图纸只在 HQC3 目录，本目录没有，不列入链接。

### B1 SQ-M+（7 份）
| 文件 | 客户/国家 | 页数 | 备注 |
|---|---|---:|---|
| [AISLING-20531783-常熟乐盈-SQ-M+.pdf](../HQ-PDF/AISLING-20531783-常熟乐盈-SQ-M+.pdf) | 常熟乐盈 / 中国 | 238 | 有 KQ 接口/抱闸页 |
| [ANSEL-20536199-蚌埠大美-SQ-M+.pdf](../HQ-PDF/ANSEL-20536199-蚌埠大美-SQ-M+.pdf) | 蚌埠大美 / 中国 | 249 | CMC + 真空 + 远程箱 |
| [ANWEN-20543109-山东恒升-SQ-M+.pdf](../HQ-PDF/ANWEN-20543109-山东恒升-SQ-M+.pdf) | 山东恒升 / 中国 | 233 | 无 Splice |
| [AZARIA-20553680-越南-SQ-M+.pdf](../HQ-PDF/AZARIA-20553680-越南-SQ-M+.pdf) | 越南 | 234 | 有 Splice |
| [BRISEIS-20554944-无锡欣盛-SQ-M+.pdf](../HQ-PDF/BRISEIS-20554944-无锡欣盛-SQ-M+.pdf) | 无锡欣盛 / 中国 | 234 | 与 AZARIA 同页数 |
| [GUNN-20515754-东莞建力-SQ-M+.pdf](../HQ-PDF/GUNN-20515754-东莞建力-SQ-M+.pdf) | 东莞建力 / 中国 | 238 | 含 CANbus 网络页 |
| [INGEGERD-20518365-泰国佳丰-SQ-M+.pdf](../HQ-PDF/INGEGERD-20518365-泰国佳丰-SQ-M+.pdf) | 泰国佳丰 / 泰国 | 252 | DEX 25 页 |

### B2 SQ-M（3 份）
| 文件 | 客户/国家 | 页数 | 备注 |
|---|---|---:|---|
| [CASSIAN-20565766-印尼Tristar-SQ-M.pdf](../HQ-PDF/CASSIAN-20565766-印尼Tristar-SQ-M.pdf) | 印尼 Tristar | 184 | 封面订单号残留 |
| [SVENA-20543765-印度Hosur-SQ-M.pdf](../HQ-PDF/SVENA-20543765-印度Hosur-SQ-M.pdf) | 印度 Hosur | 193 | 柜号 13515/13545 |
| [VELJANA-20528948-泰国大胜达-SQ-M.pdf](../HQ-PDF/VELJANA-20528948-泰国大胜达-SQ-M.pdf) | 泰国大胜达 | 203 | 有 SPD/WEV |

### B3 SQ-N（6 份）
| 文件 | 客户/国家 | 页数 | 备注 |
|---|---|---:|---|
| [ATARA-20546848-印度孟买-SQ-N.pdf](../HQ-PDF/ATARA-20546848-印度孟买-SQ-N.pdf) | 印度 | 144 | 单柜；415V |
| [AUDRIC-20548551-印尼-SQ-N.pdf](../HQ-PDF/AUDRIC-20548551-印尼-SQ-N.pdf) | 印尼 | 184 | 双柜；三方冲突 |
| [AURELIO-20564155-南通千禧多-SQ-N.pdf](../HQ-PDF/AURELIO-20564155-南通千禧多-SQ-N.pdf) | 南通千禧多 / 中国 | 159 | 含 CMC |
| [AZIEL-20554075-印度Econovus-SQ-N.pdf](../HQ-PDF/AZIEL-20554075-印度Econovus-SQ-N.pdf) | 印度 Econovus | 144 | 单柜；415V |
| [CAMBRIA-20560610-印尼Sarana-SQ-N.pdf](../HQ-PDF/CAMBRIA-20560610-印尼Sarana-SQ-N.pdf) | 印尼 Sarana | 184 | 双柜 2x79kW |
| [CELESTINE-20568200-柬埔寨-SQ-N.pdf](../HQ-PDF/CELESTINE-20568200-柬埔寨-SQ-N.pdf) | 柬埔寨 | 190 | 双柜；加 CMC |

### B4 HQ-M（10 份）
| 文件 | 客户/国家 | 页数 | 柜号组 | 备注 |
|---|---|---:|---|---|
| [ADARA-20522505-西班牙Hinojosa-HQ-M.pdf](../HQ-PDF/ADARA-20522505-西班牙Hinojosa-HQ-M.pdf) | 西班牙 Hinojosa | 381 | 13501 组 | 新平台 S7-1500F |
| [ALARIC-20491225-保加利亚-HQ-M.pdf](../HQ-PDF/ALARIC-20491225-保加利亚-HQ-M.pdf) | 保加利亚 | 346 | 13505 组 | 45kW 基准；偏离标准 |
| [ANDREAS-20534690-英国eCorrugated-HQ-M.pdf](../HQ-PDF/ANDREAS-20534690-英国eCorrugated-HQ-M.pdf) | 英国 | 364 | 13505 组 | 旧柜号+Lenze 9400 |
| [ARAMIS-20522942-泰国-HQ-M.pdf](../HQ-PDF/ARAMIS-20522942-泰国-HQ-M.pdf) | 泰国 | 373 | 13505 组 | 出料站+真空 |
| [ARLEN-20544210-玖龙-HQ-M.pdf](../HQ-PDF/ARLEN-20544210-玖龙-HQ-M.pdf) | 玖龙 / 美国 | 340 | 13505 组 | UL；480V/60Hz |
| [BELEN-20526561-西班牙WetDry-HQ-M.pdf](../HQ-PDF/BELEN-20526561-西班牙WetDry-HQ-M.pdf) | 西班牙 WetDry | 382 | 13501 组 | 新平台；偏离标准 |
| [DALIAH-20539256-阿联酋-HQ-M.pdf](../HQ-PDF/DALIAH-20539256-阿联酋-HQ-M.pdf) | 阿联酋 | 336 | 13505 组 | 柜体水冷 |
| [ROCH-20511104-意大利Capua-HQ-M.pdf](../HQ-PDF/ROCH-20511104-意大利Capua-HQ-M.pdf) | 意大利 Capua | 398 | 13501 组 | 新平台；有 WEV |
| [SAANA-20543399-伊拉克-HQ-M.pdf](../HQ-PDF/SAANA-20543399-伊拉克-HQ-M.pdf) | 伊拉克 | 335 | 13505 组 | 实际 Lenze 平台 |
| [SAMANTHA-20526962-荷兰埃尔贝克-HQ-M.pdf](../HQ-PDF/SAMANTHA-20526962-荷兰埃尔贝克-HQ-M.pdf) | 荷兰 | 421 | 13505 组 | 页数最大；CMC |

## C BOM 与 Checklist
| 资料 | 位置 | 用法 |
|---|---|---|
| BOM 22 份 | [`BOM/`](../BOM/) | 按订单号命名；结构见 [43](43-bom-crosscheck.html) |
| Checklist 汇总 | [`HQ横切项目Checklist汇总.xlsx`](../HQ横切项目Checklist汇总.xlsx) | 4 个 sheet；矩阵见 [40](40-checklist-matrix.html) |
| Checklist 截图 | [`Checklist/`](../Checklist/) | 26 单 93 张；原图核对 |
| SV 原始表 | [`SV/SV_原始顺序_干净表格.xlsx`](../SV/SV_原始顺序_干净表格.xlsx) | 3 个项目逐项对比 |
| 3401 历史 BOM | [`SV/`](../SV/) | 3 个项目快照 |

## D 模板与控制资料
| 资料 | 位置 | 说明 |
|---|---|---|
| CN Beckhoff 模板 | [`Tem-Color-PDF/`](../Tem-Color-PDF/) | 227 页；无封面与报表 |
| CN Siemens+Lenze 模板 | [`Tem-Color-PDF/`](../Tem-Color-PDF/) | 266 页；无行号线 |
| EU 模板 | [`Tem-Color-PDF/`](../Tem-Color-PDF/) | 267 页；有行号线与 MAV |
| 彩色参考 | [`Tem-Color-PDF/`](../Tem-Color-PDF/) | ANSEL/ARLEN 同页树彩色导出 |
| Beckhoff IO 矩阵 | [`HQ IO_Beckhoff_Matrix_V3.3.xlsx`](../HQ%20IO_Beckhoff_Matrix_V3.3.xlsx) | 3 个 sheet |
| ILC 教程 | [`Parts list creation with EPLAN.docx`](../Parts%20list%20creation%20with%20EPLAN.docx) | 25 张截图 |
| RS-X 配置 | [`RS-X configuration list.xlsx`](../RS-X%20configuration%20list.xlsx) | 湿端数据，非 HQ 本体 |

## E 既有深度页（9 页）
| 页面 | 主题 |
|---|---|
| [hq-complete.html](../HTML/hq-complete.html) | 双刀横切完整解读（总纲） |
| [hq-duplex-cycle.html](../HTML/hq-duplex-cycle.html) | 双刀一个工作循环 |
| [hq-duplex-formula.html](../HTML/hq-duplex-formula.html) | 切长与加减速公式 |
| [hq-motors-drives.html](../HTML/hq-motors-drives.html) | 电机与驱动清单 |
| [hq-deceleration.html](../HTML/hq-deceleration.html) | 减速与制动 |
| [hq-functions-signals.html](../HTML/hq-functions-signals.html) | 功能、结构、信号 |
| [hq-dex-analysis.html](../HTML/hq-dex-analysis.html) | DEX 信号交换 |
| [bhs_hq_circuit_diagram_guide.html](../HTML/bhs_hq_circuit_diagram_guide.html) | 图纸阅读与项目对比 |
| [bhs-hq-duplex-faq.html](../HTML/bhs-hq-duplex-faq.html) | 双刀高频问题 |

## F 维护约定
- 源文件更新后，先改 `HQ-KB/drafts/*.md`，再重新渲染对应页面。
- 页面里的页码默认指 PDF 阅读器页码；图框页号写在 `=功能组/+柜号/页号` 里。
- 任何「待确认」标记都表示：当前资料没有直接证据，必须回项目图纸、SV 或 BOM 核实。
- 新增订单时，同步更新 [40 矩阵](40-checklist-matrix.html) 与 [43 三方核对](43-bom-crosscheck.html)。

## 导航
[← 上一页：12 术语与 FAQ](12-glossary-faq.html) · [知识库首页](index.html) · [下一页：14 能力评估 →](14-readiness.html)
