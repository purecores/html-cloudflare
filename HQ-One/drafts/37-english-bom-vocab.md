---
template: doc
theme: blueprint
title: 37 · BOM 物料描述中英对照
subtitle: 机械紧固件、材料、表面处理、标准与 BOM 列名；读 BOM 不再靠猜
source: DALIAH / ANWEN / AZARIA 的 3401.xlsx Object description
---
BOM 是英语单词最密集的地方。一条描述通常按“类型 + 规格 + 材料 + 标准”排列，例如 `CHEESE-HEAD SCREW M6X20` = 内六角/ cheese-head 螺钉 M6×20。先记类型词，再记材料和标准。

## A BOM 列名
| 英文 | 中文 | 说明 |
|---|---|---|
| Explosion level | 展开层级 | `.1/..2/...3` |
| Component number | 物料号/组件号 | E/I 开头是电气分支 |
| Object description | 物料描述 | 本页重点 |
| Item category | 行类别 | L/Y/R |
| Size/dimensions | 尺寸/规格 | 型号/尺寸 |
| Comp. Qty (CUn) | 组件数量 | 数量 |
| Component UoM | 组件单位 | PC/M/KG |
| Production relevant | 生产相关 | X=是 |
| Item Number | 行号 | 0010/0020 |
| Spare Part Indicator | 备件标识 |  |
| Plant-Specific Material Status | 工厂物料状态 | 50/95 |
| Special Procurement Type | 特殊采购类型 | 50 |
| Sort String | 排序字符串 |  |
| Colour Code | 颜色码 |  |
| Plant | 工厂 | 1100/6100 |
| Base Unit of Measure | 基本单位 | PC |
| MRP Type | MRP 类型 | PD/ND |
| Valid from | 有效期从 | 日期 |

## B 紧固件与连接件
| 英文 | 中文 | 说明 |
|---|---|---|
| SCREW | 螺钉 | 通用 |
| CHEESE-HEAD SCREW | 圆柱头/内六角螺钉 | 常见 |
| HEXAGONAL NUT | 六角螺母 | 配螺钉 |
| HEXAGONAL BOLT | 六角螺栓 | 大规格 |
| WASHER | 垫圈 | 平垫 |
| DISK | 垫片/圆盘 | 常见 `DISK 8` |
| SPRING WASHER | 弹簧垫圈 | 防松 |
| THREADED PIN | 螺纹销 | 定位 |
| STUD | 双头螺柱 |  |
| RIVET | 铆钉 |  |
| PIN | 销 | 圆柱/开口 |
| CIRCLIP | 卡簧 | 轴用/孔用 |
| SEEGER RING | 西格环/卡簧 | 品牌名 |
| KEY | 键 | 平键/半圆键 |
| CLAMP | 夹块/卡箍 |  |
| COLLAR | 轴环/套环 |  |
| SPACER | 隔套 |  |
| SHIM | 垫片 | 调整 |
| BUSHING | 衬套 |  |
| SLEEVE | 套筒/套管 |  |
| COUPLING | 联轴器 |  |
| FLANGE | 法兰 |  |
| NIPPLE | 接头 |  |
| ELBOW | 弯头 |  |
| TEE | 三通 |  |
| REDUCER | 异径接头 |  |
| FITTING | 管件/接头 |  |
| HOSE | 软管 |  |
| PIPE | 管 | 硬管 |
| TUBE | 管/钢管 |  |
| GASKET | 垫片/密封垫 |  |
| O-RING | O 形圈 |  |
| SEAL | 密封件 |  |

## C 机械件与传动
| 英文 | 中文 | 说明 |
|---|---|---|
| BEARING | 轴承 |  |
| ROLLER | 滚轮/辊 |  |
| BELT | 皮带 |  |
| PULLEY | 带轮 |  |
| SPROCKET | 链轮 |  |
| CHAIN | 链条 |  |
| GEAR | 齿轮 |  |
| GEARBOX | 减速箱 |  |
| GEAR MOTOR | 减速电机 |  |
| BRAKE | 制动器 |  |
| CLUTCH | 离合器 |  |
| SPRING | 弹簧 |  |
| SHAFT | 轴 |  |
| AXLE | 车轴 |  |
| PLATE | 板 |  |
| SHEET | 薄板 |  |
| ANGLE | 角钢/角件 |  |
| BAR | 棒/条 |  |
| ROUND STEEL | 圆钢 |  |
| SQUARE TUBE | 方管 |  |
| PROFILE | 型材 |  |
| FRAME | 机架 |  |
| SUPPORT | 支架 |  |
| BRACKET | 支架/角码 |  |
| COVER | 盖/罩 |  |
| HOUSING | 壳体 |  |
| DOOR | 门 |  |
| HINGE | 铰链 |  |
| HANDLE | 把手 |  |
| LOCK | 锁 |  |
| CASTER | 脚轮 |  |
| VALVE | 阀 |  |
| CYLINDER | 气缸/油缸 |  |
| PUMP | 泵 |  |
| FILTER | 过滤器 |  |
| REGULATOR | 调压器 |  |
| MANIFOLD | 阀块/歧管 |  |
| MOTOR | 电机 |  |
| FAN | 风扇 |  |

## D 材料与表面处理
| 英文 | 中文 | 说明 |
|---|---|---|
| STEEL | 钢 |  |
| STAINLESS STEEL | 不锈钢 |  |
| GALVANIZED | 镀锌 |  |
| ZINC PLATED | 镀锌 |  |
| BRASS | 黄铜 |  |
| ALUMINIUM | 铝 |  |
| COPPER | 铜 |  |
| PLASTIC | 塑料 |  |
| RUBBER | 橡胶 |  |
| PVC | 聚氯乙烯 |  |
| PU | 聚氨酯 |  |
| PTFE | 聚四氟乙烯 |  |
| PA | 尼龙 |  |
| CFK | 碳纤维 | 刀辊 |
| HV | 高硬度/维氏硬度 | `DISK 10-200 HV` |
| BLACK | 黑色 | 表面 |
| WHITE | 白色 |  |
| RED | 红色 |  |
| BLUE | 蓝色 |  |
| GREEN | 绿色 |  |
| YELLOW | 黄色 |  |
| GREY | 灰色 |  |

## E 标准与认证
| 英文 | 中文 | 说明 |
|---|---|---|
| CE | 欧盟认证 | 电缆/器件 |
| UL | 美国认证 | 电缆/器件 |
| ISO | 国际标准 |  |
| DIN | 德国标准 | DIN 912/934/125 |
| EN | 欧洲标准 |  |
| IEC | 国际电工标准 |  |
| RAL | 德国颜色标准 | RAL 7024 |
| NEMA | 美国电气外壳标准 | NEMA 12 |
| SCCR | 短路电流额定值 | 铭牌 |
| IP | 防护等级 | IP54 |
| PG | 螺纹标准 | PG13.5 |
| M | 公制螺纹 | M6/M8/M10 |
| DIN 912 | 内六角圆柱头螺钉 |  |
| DIN 934 | 六角螺母 |  |
| DIN 125 | 平垫圈 |  |
| DIN 127 | 弹簧垫圈 |  |
| DIN 471 | 轴用卡簧 |  |
| DIN 472 | 孔用卡簧 |  |

## F 读 BOM 的 6 个规则
| 规则 | 说明 |
|---|---|
| 从右往左拆 | `CHEESE-HEAD SCREW M6X20`：类型+规格 |
| 先看单位 | PC=件，M=米，KG=千克 |
| 不要被长描述吓住 | 先找类型词，再看尺寸/材料 |
| 标准号单独看 | DIN/ISO/CE/UL 是标准，不是尺寸 |
| 同一物料可多分支 | 数量分别计算 |
| 电气件看 E/I 子树 | 机械件看 BASIC/DRIVE 等分支 |

> 这一页覆盖 BOM 里最常见的类型词、材料、标准和列名；遇到长尾机械描述，先按“类型词+尺寸+材料”拆，再查 32–35 页的通用词。

## 导航
[← 上一页：36 英语自测](36-english-quiz.html) · [知识库首页](index.html) · [下一页：38 主驱动选型 →](38-drive-selection.html)
