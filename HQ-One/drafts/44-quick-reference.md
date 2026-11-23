---
template: sheet
theme: blueprint
title: 44 · 订单处理一页速查
subtitle: 流程、页号段、功能组、设备代号、ILC 八步；打印贴墙用
source: HQ-KB 全库浓缩
cols: 2
---
一页纸版本。遇到不确定的细节，再回对应章节查。

## A 一页纸流程
```flow LR
(SV/Checklist) -> 读15项
读15项 -> 选基线
选基线 -> 差异清单
差异清单 -> 改EPLAN
改EPLAN -> 三方核对
三方核对 -> ILC
ILC -> 归档
```

## B 页号段速记
| 段 | 内容 |
|---|---|
| 10–32 | 主电源、PE |
| 51–89 | 400V 配电 |
| 101–139 | 24VDC |
| 201–233 | 230V |
| 251–270 | 柜冷 |
| 300–380 | 安全 |
| 401–470 | PLC |
| 500–590 | 整线接口 |
| 601–603 | 油泵 |
| 700–750 | 测速、拼接 |
| 1000–1999 | HQ1 |
| 2000–2999 | HQ2 |

## C 功能组速记
| 代码 | 含义 |
|---|---|
| =MPS | 主进线与 PE |
| =LVS / =LSV | 400V 配电 |
| =DCV | 24VDC |
| =ACV | 230V |
| =SCC | 柜冷 |
| =STE | 安全 |
| =PLC | PLC 与 IO |
| =DEX | 整线接口 |
| =VEL | 测速 |
| =SPD | 拼接检测 |
| =INF | 进料 |
| =KNB | 刀梁与主传动 |
| =OUS / =OUF | 出料站 / 出料辊 |
| =WEV | 排废 |
| =JAM | 卡纸 |
| =CMC | 切标检测 |
| =VAC | 真空 |

## D 设备代号
| 字母 | 含义 | 例 |
|---|---|---|
| Q | 开关、断路器 | -10Q1 |
| F | 熔断器、保护 | -51F1 |
| K | 接触器、继电器 | -301K1 |
| M | 电机 | -1300M1 |
| T | 驱动、变压器 | -1300T1 |
| U | 母排、电源 | -10U3 |
| X | 端子排 | -XPE |
| W | 电缆 | -WC461 |
| S | 开关、传感器 | -380S1 |
| B | 传感器 | -750B2 |
| Y | 阀、执行器 | -1090Y1 |
| G | 电源模块 | -101G1 |
| A | 机架、组件 | -405A1 |
| C | 电容 | -1080C1 |
| R | 电阻 | -1050R1 |

## E 高频信号
| 信号 | 含义 |
|---|---|
| Good Cut to AS | 良品剪切 80ms 脉冲 |
| Ejecting Waste | 正在排废 |
| Stop-Safe to DF | 停双面机请求 |
| STO | 安全转矩关断 |
| LOTO | 上锁挂牌 |
| AOC Running | 换单运行 |
| Main contactor feedback | 主接触器反馈 |
| Charge feedback | 预充反馈 |
| Paper exists | 有纸 |

## F ILC 八步
| 步 | 动作 |
|---|---|
| 1 | SAP → Master data → Filter |
| 2 | 选 4PEP 过滤器并 Activate |
| 3 | Material management (BOM-oriented) |
| 4 | BOM relevant / irrelevant |
| 5 | Assign SO Position / BOM |
| 6 | Assign 物料号 |
| 7 | Assign SO Material 物料组 |
| 8 | Bill of materials → Create BOM |

> 顺序不能反。Create BOM 前无空白、无红色行。

## G 停手清单
- 安全链、STO、急停、门锁。
- 主传动功率、驱动型号、电机数量。
- 柜体、母排、电容、直流母线。
- EU/CN/UL 标准、电压、认证。
- 单双刀架构、柜号体系。
- 客户接口协议。
- 三方数据冲突未确认。

## H 常用页面
| 需要 | 页面 |
|---|---|
| 26 单配置 | [40](40-checklist-matrix.html) |
| 改图流程 | [41](41-template-selection.html) |
| EPLAN 跳转 | [42](42-eplan-navigation.html) |
| 三方核对 | [43](43-bom-crosscheck.html) |
| SV 解读 | [06](06-sv-requirements.html) |
| BOM 结构 | [07](07-bom-structure.html) |
| ILC | [10](10-sap-ilc.html) |
| 术语 | [12](12-glossary-faq.html) |

## 导航
[← 上一页：43 三方核对](43-bom-crosscheck.html) · [知识库首页](index.html)
