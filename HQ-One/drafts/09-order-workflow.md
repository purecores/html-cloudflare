---
template: doc
theme: blueprint
title: 09 · 日常订单处理 SOP：从接到 SV 到释放 BOM
subtitle: 七步流程、三张核对表、六个升级点；把“凭经验”变成“有顺序”
source: SV/BOM/EPLAN/SAP-ILC 教程综合
---
一个 HQ 订单的电气工作，可以固定成七步：接单→读 SV→找相似→核图纸→核 BOM→ILC 释放→交付前检查。每一步都有输入、输出和检查点。顺序错了，后面一定返工。

## A 七步流程
```flow LR
(接单) -> 资料包
资料包 -> 配置画像: 读SV
配置画像 -> 相似项目: 按机型/柜号
相似项目 -> 图纸核对
图纸核对 -> BOM核对
BOM核对 -> ILC释放: SAP
ILC释放 -> 交付前检查
```

| 步骤 | 输入 | 输出 | 主责 |
|---|---|---|---|
| 1 接单 | 销售订单、SV、技术协议 | 资料包清单 | 销售/项目 |
| 2 读 SV | SV 表 | 配置画像（单/双刀、柜号、选配） | 电气 |
| 3 找相似 | 26 份历史图纸 | 最接近的 2–3 个项目 | 电气 |
| 4 核图纸 | 历史 EPLAN、当前项目 | 电气差异清单 | 电气 |
| 5 核 BOM | 3401.xlsx、图纸 | 物料差异清单 | 电气/采购 |
| 6 ILC 释放 | EPLAN、SAP | SAP BOM | 电气 |
| 7 交付检查 | 全部资料 | 放行结论 | 电气/项目 |

## B 第 1 步：接单与资料包
| 检查 | 标准 |
|---|---|
| 销售订单号/Item | 与 SV、图纸封面、BOM 首行一致 |
| SV 版本 | 是最新确认版，Special Variants 有文字说明 |
| 技术协议/偏离项 | DEVIATION FROM STANDARD 已书面确认 |
| 交付范围 | 是否含堆码、纵切、整线接口 |
| 客户标准 | EU / CN / 客户自定义 |
| 现场条件 | 电压、频率、环境温度、柜体位置 |

## C 第 2 步：读 SV 建配置画像
| 画像项 | 看 SV 哪一行 | 结论示例 |
|---|---|---|
| 单刀/双刀 | Machine Type + Frame | SQ-M+ + Simplex；HQ-M + Duplex 925 |
| 幅宽 | Working Width | 2500 / 2800 / 3350 |
| 操作侧 | Drive side | Left / Right → LHD / RHD |
| 柜号组 | 由机型+代际推导 | 旧单刀 13501 组；旧双刀 13505 组；新 SQ-M 13515；新 HQ-M 13501 组 |
| 主传动 | Main Drive | 2x45kW 异步 / 2x112kW 同步 / 2x60kW |
| 刀梁 | Knife Bar | Steel 1500 / CFK 1800 |
| 柜冷 | Cabinet cooling | water / air |
| 选配 | OPTIONS | SPD / VEL / VAC / CMC / 门锁 |
| 标准 | Electrical standard | EU / CN |

> 详细逐项解读见 [06 SV 需求规格](06-sv-requirements.html)。

## D 第 3 步：找相似项目
| 优先级 | 匹配项 | 说明 |
|---|---|---|
| 1 | 单刀/双刀 | 决定柜号组与页树，必须首先匹配 |
| 2 | 幅宽 | 决定机架/刀梁/出料，尽量同幅宽 |
| 3 | 主传动 | 2x45 / 2x112 / 2x60，决定驱动与柜体 |
| 4 | 柜冷/标准 | water/air、EU/CN，决定电气件 |
| 5 | 选配组合 | SPD/VEL/VAC/CMC，决定附加回路 |
| 6 | 操作侧 | LHD/RHD，决定布置与现场接线 |

```tree
先筛
  单刀 SQ-M+ → AISLING / ANSEL / ANWEN / AZARIA / BRISEIS / GUNN
  双刀 HQ-M → ALARIC / ARAMIS / ARLEN / DALIAH / SAANA
再筛
  同幅宽 → 同柜体页数
  同主传动 → 同驱动/电机
  同选配 → 同附加页
```

> 26 份图纸对比见 [08 项目差异矩阵](08-project-matrix.html)。页数只用于找相似，不能作为配置依据。

## E 第 4 步：图纸核对
| 功能组 | 核对什么 | 常见差异 |
|---|---|---|
| =MPS | 进线、PE、接地、主开关 | 柜号 13501 vs 13505 |
| =LVS | 400VAC 分配、主接触器 | 主传动功率、接触器规格 |
| =DCV | 24VDC 电源、分配 | 电源数量、负载 |
| =STE | 急停、门、STO | 安全模块、通道数 |
| =PLC | PLC/IO 模块 | 单/双刀、选配模块 |
| =DEX | 与 DF/SR/AS 接口 | 客户接口、信号数量 |
| =KNB | 刀梁、电机、编码器 | 2x45/2x112/2x60、CFK/STEEL |
| =INF/=OUS | 进料/出料 | 双辊/EP、出料站/双电机 |
| =WEV/=JAM | 排废/卡纸 | 有/无、单/双刀 |
| =SCC | 柜冷 | water/air、空调/风扇 |

> 每个功能组的回路级读法见 [15 400V](15-400v-power.html) 到 [22 端子/电缆](22-terminals-cables.html)。

## F 第 5 步：BOM 核对
| 检查 | 方法 |
|---|---|
| 顶层结构 | 看 `.1` 是否含 BASIC MACHINE / DRIVE / INFEED / DISCHARGE / CONTROL |
| 柜号分支 | 旧单刀 E_13501 组；旧双刀 E_13505 组；新 SQ-M E_13515/13545；新 HQ-M E_13501 组 |
| 电气子项 | 展开 E/I 分支，不只看顶层 |
| 关键件 | 伺服电机、驱动、PLC、安全模块、端子、电缆 |
| 数量/单位 | PC vs M/KG，R 行按重量 |
| 状态/有效期 | Plant、Material Status、Valid from |
| 与 SV/图纸一致 | 选配、功率、柜号逐项对 |

> BOM 读法见 [07 BOM 结构](07-bom-structure.html)。

## G 第 6 步：ILC 释放 BOM
```flow LR
(EPLAN项目) -> Master Data
Master Data -> Material management: BOM-oriented
Material management -> BOM relevant / irrelevant
BOM relevant / irrelevant -> Assign SO Position / BOM
Assign SO Position / BOM -> Assign: 物料号
Assign: 物料号 -> Assign SO Material: 物料组
Assign SO Material: 物料组 -> Bill of Materials: Create BOM
```

| 顺序 | 动作 | 判定 |
|---|---|---|
| 1 | 打开项目，检查 SAP 工具栏 | Master Data 存在 |
| 2 | Filter 4PEP Connect Eplan Filter | 过滤正确 |
| 3 | Material management (Bom-oriented) | 按位置代号列出物料 |
| 4 | BOM irrelevant | 不释放的物料变灰 |
| 5 | Assign SO Position / BOM | 订单号 + Item，Read，Apply |
| 6 | Assign | SAP Material number 列补齐 |
| 7 | Assign SO Material | 选物料组，OK |
| 8 | Bill of Materials → Create BOM | 导入 SAP |
| 9 | `Terminate process` | 关闭 |

> 分步界面与常见错误见 [10 EPLAN→SAP ILC](10-sap-ilc.html)。顺序不能颠倒：先定相关性，再挂订单，再分物料，再分组，最后建 BOM。

## H 第 7 步：交付前检查
| # | 检查项 | 通过标准 |
|---|---|---|
| 1 | 销售订单/Item | 四处一致：SV、封面、BOM、SAP |
| 2 | 单/双刀与柜号 | 与 SV Frame/Placement 一致 |
| 3 | 主传动 | 功率、数量、冷却方式一致 |
| 4 | 选配 | 每个 Yes 都有图纸/BOM 对应 |
| 5 | 安全链 | 急停/门/STO 双通道完整 |
| 6 | IO 表 | 模块/地址与图纸一致 |
| 7 | 电缆/端子 | 电缆长度、端子附件齐全 |
| 8 | 隔离开关组件 | 本体+保护罩+手柄+延长杆+接线鼻 |
| 9 | 端子排组件 | 端子+端板+终端固定+保护罩+标记卡 |
| 10 | 一图多 Item | 已按 Item 拆分 |
| 11 | 线束设置 | 已勾选除 Wire harness assembly parts 外的选项 |
| 12 | 文件归档 | 图纸、SV、BOM、释放记录齐全 |

## I 异常与升级
| 异常 | 先做什么 | 升级给谁 |
|---|---|---|
| SV 与图纸矛盾 | 以 SV 为准，记录差异 | 项目/销售确认 |
| 图纸物料号查不到 | 查主数据同规格替代 | 采购/BHS 主数据 |
| BOM 与图纸数量不符 | 以图纸位号为准，回查 BOM 分支 | 电气主管 |
| ILC 报错/重复 | 看 Error 提示，确认重复/设置 | SAP 关键用户 |
| 客户接口不清 | 拉出 DEX 页逐信号确认 | 项目/客户 |
| 交期冲突 | 先释放长周期件 | 项目经理 |

## J 排产参考
`RS-X configuration list.xlsx` 是 RS-I/RS-X 产品线的配置与发布跟踪表，不是 HQ 数据，也不能替代 SV 或 3401 BOM。3401 是主机 cut-off 的一个 item；同一订单下的 RS1–RS5 由这张表管理。可借鉴它的字段：销售订单、机型、BOM 计划释放日期、释放状态、实际释放日期。HQ 订单也可以用同样的字段自建跟踪表。

## 导航
[← 上一页：08 项目差异矩阵](08-project-matrix.html) · [知识库首页](index.html) · [下一页：10 ILC 释放 BOM →](10-sap-ilc.html)
