---
template: doc
theme: blueprint
title: 45 · 数据源、口径与维护约定
subtitle: 每页结论来自哪份文件；口径怎么算；待确认项怎么登记
source: D:/Code/Share/HQC4 全部数据源
---
知识库的事实全部可回溯到源文件。有争议时先回源核对，再改本库。本页说明数据范围、统计口径和维护方法。

## A 数据源清单
| 数据源 | 路径 | 数量 | 更新方式 |
|---|---|---|---|
| 图纸 PDF | `HQ-PDF/` | 26 份 | 新订单导出后追加 |
| BOM | `BOM/` | 22 份 xlsx | SAP 导出后覆盖 |
| Checklist 截图 | `Checklist/` | 93 张 | 接单时补拍 |
| Checklist 汇总 | `HQ横切项目Checklist汇总.xlsx` | 4 个 sheet | 新单追加行 |
| SV 原始表 | `SV/SV_原始顺序_干净表格.xlsx` | 3 个项目 | 历史样本 |
| 3401 BOM | `SV/<项目>/3401.xlsx` | 3 份 | 历史快照 |
| 主模板 | `Tem-Color-PDF/` | 3 份 | 模板更新时替换 |
| 彩色参考 | `Tem-Color-PDF/` | 2 份 | 与 ANSEL/ARLEN 同页树 |
| IO 矩阵 | `HQ IO_Beckhoff_Matrix_V3.3.xlsx` | 3 个 sheet | 版本升级时替换 |
| ILC 教程 | `Parts list creation with EPLAN.docx` | 25 图 | 流程变更时更新 |
| RS-X 配置 | `RS-X configuration list.xlsx` | 10 个 sheet | 湿端数据，非 HQ 本体 |

## B 统计口径
| 指标 | 口径 | 注意 |
|---|---|---|
| 图纸页数 | PDF 总页数 | 不等于图框页号最大值 |
| BOM 行数 | Data 表 B 列非空 | 含分支节点行 |
| E/I 顶层分支 | B 列 L2 以 E 或 I 开头 | 不含 `_X` 扩展 |
| E/I 直接子行 | 分支下第一层 | 不等于全部后代 |
| 选配计数 | Checklist 有 Yes 的行 | 空白不等于没有 |
| 家族计数 | Machine Type 字段 | 与 Frame 交叉验证 |

> 同一指标不要混用两种口径。比较前先确认口径一致。

## C 图纸与模板的关系
| 类型 | 例子 | 用途 |
|---|---|---|
| 主模板 | CN_HQM_Beckhoff / CN_HQM_Siemens / EU_HQM | 新项目派生起点 |
| 彩色参考 | bengbudameiHQ、jiulongHQ | 核对颜色与页树 |
| 实项目 | 26 份 HQ-PDF | 页级对照与配方来源 |

> 模板无封面、无 WRE/CON 报表；实项目才有完整报表。

## D 待确认项登记规则
| 规则 | 说明 |
|---|---|
| 必须写依据 | 哪份文件、哪页、哪一行 |
| 必须写影响 | 影响哪些页、哪些物料 |
| 必须写责任人 | 谁去确认 |
| 解决后改状态 | 改为「已确认」并注明依据 |
| 未解决不释放 | 冲突未解决不得 ILC |

## E 已知待确认项
| 项 | 现状 | 去哪确认 |
|---|---|---|
| AUDRIC 机型 | Checklist SQ-N，变体 SQ-M，BOM 表头 SQ-M+ | 项目/销售书面确认 |
| SAANA 控制平台 | Checklist Beckhoff，图纸 Lenze | 以图纸+BOM 为准 |
| BRISEIS 幅宽 | 基本 2800，变体 2500 | BOM 与 RS-X 均 2500 |
| ARLEN 进料 | 单辊对双辊 | 变体与 BOM |
| INGEGERD BOM | 模板为 HQ-M 60kW | SAP 重导 BOM |
| ATARA/AUDRIC BOM | 未展开 | SAP 重新展开 |
| CASSIAN 封面 | 订单号残留 20543765 | 以文件名与 Checklist 为准 |
| 8 单电标缺失 | Details 首行被裁 | RS-X 或名称牌 |

## F 维护流程
```flow LR
(源文件更新) -> 改 drafts
改 drafts -> 重渲染HTML
重渲染HTML -> 校验链接
校验链接 -> 记录版本
```
| 步 | 动作 | 工具 |
|---|---|---|
| 1 | 新图纸/新 BOM 放入对应目录 | 资源管理器 |
| 2 | 更新 40/43 的统计表 | 本库 drafts |
| 3 | 重渲染受影响页面 | am render |
| 4 | 检查页底导航与链接 | 浏览器 |
| 5 | 在变更记录写明版本 | 变更记录 |

## G 版本记录
| 版本 | 日期 | 变更 |
|---|---|---|
| v1 | 2026-11-20 | 40 页初版（30 PDF 口径） |
| v2 | 2026-11-23 | 26 PDF 口径；新增 40–45；修复冲突与图片路径 |

## H 使用提醒
- 本库是学习与核对工具，不是公司授权文件。
- 实际改图与释放按公司设计评审、安全评审与授权流程执行。
- 任何「待确认」项都不得直接用于生产。

## 导航
[← 上一页：44 一页纸速查](44-quick-reference.html) · [知识库首页](index.html)
