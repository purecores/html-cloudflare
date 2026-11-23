---
template: doc
theme: blueprint
title: 40 · 26 个项目 Checklist 配置矩阵
subtitle: 一单一行；同机型差异、选配分布、特殊变体与已知冲突都在这一页
source: HQ横切项目Checklist汇总.xlsx · 93 张 Checklist 截图 · 26 份 HQ-PDF · 22 份 BOM
---
本页是订单配置的总表。拿到新订单，先在表里找到同家族行，逐列比对，再进 [41 改图流程](41-template-selection.html) 选基线模板。

## A 总览：26 个订单怎么分
| 家族 | 订单数 | 页数范围 | 柜号代际 | 控制平台 | 典型主传动 |
|---|---:|---|---|---|---|
| HQ-M | 10 | 335–421 | 13505 组 / 13501 组 | Beckhoff 4 / Lenze 6 | 2x45 / 2x60kW 异步 |
| SQ-M+ | 7 | 233–252 | 13501/11/31/41 | Beckhoff | 2x112kW 同步 |
| SQ-M | 3 | 184–203 | 13515/13545 | Beckhoff | 2x15 / 2x35.4kW |
| SQ-N | 6 | 144–190 | 13511 / +13531 | Beckhoff | 53kW / 2x79kW |
| 合计 | 26 | 144–421 | — | Beckhoff 21 / Lenze 5 | — |

| 统计项 | 数量 | 说明 |
|---|---:|---|
| 含 Details 页签 | 17 | SQ-M / SQ-N 无此页签 |
| 柜体水冷 | 2 | DALIAH、SAANA |
| 集成 AOC | 26 | 全部 Yes |
| 带排废 | 13 | HQ-1 或 HQ-1/2 |
| 拼接检测 | 8 | SQ-M+ 5 项、HQ-M 3 项 |
| 激光测速 | 8 | 同上 |
| Cut-to-Mark | 2 | ANSEL、SAMANTHA |
| 特殊变体 | 10 单 | 共 15 条 |
| 偏离标准 | 2 | ALARIC、BELEN |

## B HQ-M：10 单（双刀 Duplex 925）
| 订单 | 代号 | 幅宽/侧 | 控制 | 主传动 | 排废/拼接/激光/CMC | 电标 | 特殊 |
|---|---|---|---|---|---|---|---|
| 20491225 | ALARIC | 2500/R | Beckhoff | 2x45 异步 | — | EU | 偏离标准；CFK 2300 |
| 20511104 | ROCH | 2800/L | Lenze | 2x45 异步 | HQ1+2 / — / — / — | EU | 含 KQ 废料带 |
| 20522505 | ADARA | 3350/R | Lenze | 2x60 异步 | — | EU | 新平台 |
| 20522942 | ARAMIS | 3350/R | Beckhoff | 2x60 异步 | HQ1+2 / 有 / 有 / — | CN | EP 进料、出料站、真空 |
| 20526561 | BELEN | 3350/L | Lenze | 2x60 异步 | — | EU | 偏离标准 |
| 20526962 | SAMANTHA | 2500/L | Lenze | 2x45 异步 | HQ1+2 / 有 / — / CMC | CN | 2 条 Sheet-cleaner |
| 20534690 | ANDREAS | 2800/L | Lenze | 2x45 异步 | — / — / 有 / — | EU | 旧柜号+新驱动 |
| 20539256 | DALIAH | 2500/R | Beckhoff | 2x45 异步 | — | EU | 柜体水冷 |
| 20543399 | SAANA | 2500/R | Lenze | 2x45 异步 | — | EU | 柜体水冷；Stacker 空白 |
| 20544210 | ARLEN | 2800/R | Beckhoff | 2x60 异步 | HQ1+2 / 有 / 有 / — | UL | 480V/60Hz；单辊进料冲突 |

## C SQ-M+：7 单（单刀 2x112kW 同步）
| 订单 | 代号 | 幅宽/侧 | 排废/拼接/激光 | 刀梁 | 特殊 |
|---|---|---|---|---|---|
| 20515754 | GUNN | 3350/L | HQ1 / 有 / 有 | CFK 1500 | — |
| 20518365 | INGEGERD | 2800/L | HQ1 / — / 有 | CFK 1500 | BOM 模板错误 |
| 20531783 | AISLING | 2800/L | HQ1 / 有 / 有 | CFK 1500 | KQ 接口、抱闸 |
| 20536199 | ANSEL | 3150/L | HQ1 / 有 / 有 | CFK 1500 | CMC 自动版、真空、远程箱 |
| 20543109 | ANWEN | 3350/L | HQ1 / — / 有 | CFK 1800 | 普通齿形刀 |
| 20553680 | AZARIA | 2800/L | HQ1 / 有 / — | CFK 1800 | 300mpm、线槽、废料车 |
| 20554944 | BRISEIS | 2800→2500/R | HQ1 / 有 / 有 | CFK 1800 | 幅宽冲突（见 G） |

## D SQ-M：3 单（新平台 13515/13545）
| 订单 | 代号 | 幅宽/侧 | 主传动 | 进料 | 特殊 |
|---|---|---|---|---|---|
| 20528948 | VELJANA | 2500/R | 2x35.4kW | EP 自动 | 变体加 Splice、双辊出纸 |
| 20543765 | SVENA | 2200/L | 2x15kW | 手动气动 | — |
| 20565766 | CASSIAN | 2200/R | 2x35.4kW | 手动气动 | 封面订单号残留 |

## E SQ-N：6 单（精简单刀）
| 订单 | 代号 | 幅宽/侧 | 柜 | 主传动 | 选配 | 特殊 |
|---|---|---|---|---|---|---|
| 20546848 | ATARA | 2200/L | 13511 | 53kW 同步 | VAC、VEL | 415V；精简 Checklist |
| 20548551 | AUDRIC | 2200/L | 13511+13531 | 2x112kW | VAC、VEL | 变体写 SQ-M；三方冲突 |
| 20554075 | AZIEL | 2200/R | 13511 | 53kW 同步 | VAC、VEL | 415V；精简 Checklist |
| 20560610 | CAMBRIA | 2800/L | 13511+13531 | 2x79kW 异步 | VAC、VEL | — |
| 20564155 | AURELIO | 2200/L | 13511 | 53kW 同步 | CMC、VAC、WEV | 测米轮 |
| 20568200 | CELESTINE | 2500/L | 13511+13531 | 2x79kW 异步 | VAC、VEL、WEV | 加 Auto CMC |

## F 同机型为什么差这么多
```tree
SQ-M+ 7 单
  按刀梁分
    CFK 1500：GUNN / INGEGERD / AISLING / ANSEL
    CFK 1800：ANWEN / AZARIA / BRISEIS
  按选配分
    无 Splice：ANWEN / INGERGERD
    含 CMC：ANSEL
  按宽度分
    2800：4 单；3150：1 单；3350：2 单
```

| 观察 | 解释 | 处理 |
|---|---|---|
| 同为 SQ-M+，页数 233–252 | 选配与 DEX 页数差 14 页 | 先比选配，再比页数 |
| INGEGERD DEX 25 页 | 邻机接口最全 | 客户接口多的订单参照它 |
| ANSEL 独有 CMC+真空 | 唯一 SQ-M+ 预印检测 | 加 CMC 只能参照它 |
| HQ-M 新老平台页树不同 | 13505 组对 13501 组 | 新平台不能用旧模板 |
| SAANA Checklist 写 Beckhoff | PDF/BOM 实为 Lenze | 以图纸+BOM 为准 |

## G 已知冲突与核对方法
| 冲突 | 涉及订单 | 数据现状 | 处理 |
|---|---|---|---|
| SAP 主传动笔误 | 7 个 SQ-M+ | 写 2x112W（缺 K） | 按 2x112kW 执行 |
| 幅宽前后不一 | BRISEIS | 基本 2800，变体 2500 | BOM 与 RS-X 均为 2500，按 2500 |
| 进料形式冲突 | ARLEN | 基本单辊，变体双辊 | 按变体双辊，核对 BOM |
| 机型备注冲突 | AUDRIC | SQ-N 对变体 SQ-M | 图纸按 SQ-N，需书面确认 |
| 出料变体 | VELJANA | 单电机对双辊出纸 | 按变体，核对出料页 |
| Stacker 缺型号 | SAANA | 幅宽 2800 但型号空 | 参照 DALIAH 确认 |
| 控制平台不符 | SAANA | Checklist Beckhoff 对图纸 Lenze | 以图纸+BOM 为准 |
| BOM 模板错误 | INGEGERD | BOM 为 HQ-M 60kW | 以图纸 2x112kW 为准 |
| 封面订单号残留 | CASSIAN | 封面写 20543765 | 以文件名与 Checklist 为准 |
| Details 首行缺失 | 8 单 | 电标截图被裁 | 查 RS-X 或名称牌 |

> 每条冲突都要在变更记录里写明：谁确认、依据哪份文件、日期。

## H 与本页配套的页面
| 需要什么 | 去哪页 |
|---|---|
| 从 Checklist 到改图 | [41 改图总流程](41-template-selection.html) |
| EPLAN 页内跳转 | [42 EPLAN 导航](42-eplan-navigation.html) |
| 图纸/BOM/Checklist 冲突 | [43 三方核对](43-bom-crosscheck.html) |
| SV 字段逐项解释 | [06 SV 需求规格](06-sv-requirements.html) |
| 项目差异与复用 | [08 项目差异矩阵](08-project-matrix.html) |

## 导航
[← 上一页：39 Beckhoff 模块](39-beckhoff-modules-signals.html) · [知识库首页](index.html) · [下一页：41 改图总流程 →](41-template-selection.html)
