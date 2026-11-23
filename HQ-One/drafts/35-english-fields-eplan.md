---
template: doc
theme: blueprint
title: 35 · 图框、EPLAN 与项目字段中英对照
subtitle: 封面字段、书签、设备代号、项目信息；读图先读这一页
source: 26 份 EPLAN 图纸封面/图框 + EPLAN P8 2025 书签
---
图纸的“英语”不只在电路里，还在图框、封面、书签和项目信息里。这一页把最常查的字段集中起来；设备代号和缩写与 12 页配套使用。

## A 图框与封面字段
| 英文 | 中文 | 示例/说明 |
|---|---|---|
| Sales order | 销售订单 | 20543109 |
| Item | 行项目 | 3401 |
| Project description | 项目描述 | SQ-M+ (cut off) |
| Customer | 客户 | Shandong Hengsheng |
| Country | 国家 | China |
| Location | 地点 | LiaoCheng |
| Code word | 项目代号 | ANWEN |
| Drawing number | 图号 | 855838 |
| Main equipment number | 主设备号 | P4201073 |
| Additional equipment number | 附加设备号 | 可空 |
| Version Hardware | 硬件版本 | 001.000.006 |
| Created on | 创建日期 | 5/9/2024 |
| Edited on | 修改日期 | 11/5/2026 |
| Number of pages | 页数 | 233 |
| Changed by | 修改人 | VLIU |
| Creator | 创建人 | VLIU |
| Page | 页 | 图框右下 |
| Location plant | 位置/工厂 | HQ |
| Function group | 功能组 | =KNB |
| Copyright BHS Corrugated GmbH | BHS 版权 | 图框 |
| All rights reserved | 保留所有权利 | 图框 |
| Confidential | 保密 | 红色标记 |
| Type of machine | 机型 | SQ-M+ |
| Number of machine | 机器编号 | P4201073 |
| Year of construction | 制造年份 | 2026 |
| Circuit diagram | 电路图号 | 855838 |
| Rated voltage | 额定电压 | 400V |
| Frequency | 频率 | 50Hz |
| Phases | 相数 | 3 |
| Rated current | 额定电流 | 188.6A |
| Control voltage | 控制电压 | 24VDC |
| Full-load A | 满载电流 | 铭牌 |
| Largest motor FLA | 最大电机满载电流 | 铭牌 |
| NEMA enclosure | NEMA 防护等级 | NEMA 12 |
| SCCR | 短路电流额定值 | 铭牌 |
| Material number | 物料号 | MM42T01V03 |
| Position | 位置 | 10511 |
| Mounting site | 安装地点 | Plovdiv |
| Production / Assembly / Service | 生产/装配/服务 | 封面日期 |
| Language | 语言 | 部分封面无此字段 |

> 德语/西班牙语封面：`Kunde`=客户，`Land`=国家，`Ort`=地点，`Zeichnungsnummer`=图号，`Typenschild`=铭牌，`Nennspannung`=额定电压，`Frequenz`=频率，`Steuerspannung`=控制电压；`Cliente`=客户，`País`=国家，`Lugar`=地点，`Número de dibujo`=图号，`Tensión nominal`=额定电压，`Frecuencia`=频率，`Corriente nominal`=额定电流。

## B EPLAN 书签与文档类型
| 英文 | 中文 | 说明 |
|---|---|---|
| Page tree | 页树 | 按功能组/柜/页浏览 |
| Page list | 页列表 | 全部页平铺 |
| Device tree | 设备树 | 按结构/柜/字母/设备 |
| Device tag list | 设备标签列表 | 全部设备标签 |
| Circuit diagram | 电路图 | `&WDA` |
| General information | 通用信息 | `&GEN` |
| PLC overview | PLC 总览 | `&PLCV` |
| Network summary | 网络总览 | `&BUSV` |
| Cable diagram | 电缆图 | `&WRE` |
| Layout | 布置图 | `&LAY` |
| Terminal diagram | 端子图 | `&CON` |
| Plug diagram | 插头图 | `&PLG` |
| Enclosure legend | 箱柜设备清单 | `&LAY` 内 |
| Multi-line | 多线图 | 表示类型 |
| Single-line | 单线图 | 表示类型 |
| Panel layout | 柜内布置图 | 表示类型 |
| Overview | 总览 | 表示类型 |
| Structure identifier | 结构标识 | `=MPS+13501` |
| Full DT | 完整设备标识 | `=MPS+13501 HQ-10Q1` |
| Displayed DT | 显示设备标识 | `-10Q1` |
| Connection point designation | 连接点代号 | `1;2;3` |
| Function text | 功能文本 | 器件旁说明 |
| Part number | 部件号 | 851209539 |
| Type | 型号 | OT630E03 |
| Safety relevant | 安全相关 | 清单列 |
| Cross-reference | 交叉引用 | `/10.1` |
| Pair cross-reference | 成对交叉引用 | 德语 `Paarquerverweis` |
| Device navigation | 设备导航 | EPLAN |
| Project data | 项目数据 | EPLAN |

## C 设备代号
| 字母 | 含义 | 例子 |
|---|---|---|
| A | 组件/机架 | `-405A1` PLC 机架 |
| B | 传感器/盒 | `-750B2` 拼接传感器 |
| C | 储能/电容 | 电容组 |
| E | 供热 | 本套少用 |
| F | 保护 | `-51F1` 熔断器 |
| G | 电源 | `-101G1` 24V 电源 |
| H | 指示 | `-570H5` 指示灯 |
| K | 信号处理 | `-301K1` 安全继电器 |
| M | 电机 | `-251M1` 风扇 |
| P | 测量 | `-106P20` 压力开关 |
| Q | 电流通断 | `-10Q1` 主开关 |
| R | 电阻 | `-1032R1` 放电电阻 |
| S | 开关/传感器 | `-380S1` 接近开关 |
| T | 能量转换 | `-1300T1` 变频器 |
| U | 母排/固定 | `-10U3` PE 母排 |
| V | 材料处理 | 本套少用 |
| W | 电缆 | `-WC461` |
| X | 端子 | `-XPE`、`-X24V` |
| Y | 阀门/执行器 | `-1090Y1` 进纸阀 |
| Z | 外购传感器/附件 | 视项目 |

> 设备标签规则：`-<页号><字母><序号>`。端子 `-X…` 和电缆 `-W…` 不遵守页号前缀。

## D 项目信息与缩写
| 缩写 | 英文 | 中文 |
|---|---|---|
| HQ | Cut-off / Querschneider | 横切机 |
| SQ | SQ-M+ / SQ-M / SQ-N | 单刀横切机 |
| KQ | Rotary Shear / Kurzquerschneider | 旋转剪 |
| SR | Automatic Slitter Scorer | 自动纵切压痕机 |
| DF | Double Facer | 双面机 |
| AS | Automatic Stacker | 自动堆码机 |
| AOC | Automatic Order Change | 自动换单 |
| CCD | Central Control Desk | 中控台 |
| CCS | Corrugator Control System | 瓦线控制系统 |
| MES | Manufacturing Execution System | 制造执行系统 |
| CFK | Carbon Fiber Reinforced Plastic | 碳纤维刀辊 |
| CMC | Cut-off Control Computer | 横切电脑/切标 |
| CLPC | Cut Length PC | 切长电脑 |
| PLC | Programmable Logic Controller | 可编程逻辑控制器 |
| STO | Safe Torque Off | 安全转矩关断 |
| OS / DS | Operating Side / Drive Side | 操作侧/驱动侧 |
| LHD / RHD | Left/Right Hand Drive | 左/右操作侧 |
| EU / CN | Europe / China | 欧洲/中国标准 |
| SV | Specification | 需求特征表 |
| BOM | Bill of Materials | 物料清单 |
| ILC | EPLAN-SAP interface | EPLAN-SAP 接口 |
| SO | Sales Order | 销售订单 |
| DT | Device Tag | 设备标识 |
| SAP | SAP ERP | 企业资源系统 |

## E 读图提示
| 场景 | 先看什么 |
|---|---|
| 拿到新图纸 | 封面：Sales order/Item/机型/页数/驱动侧 |
| 找一页 | Page tree → 功能组 → 柜号 → 页号 |
| 找器件 | Device tree 或 Device tag list |
| 找 BOM | `&LAY` 的 Enclosure legend |
| 找端子 | `&CON`，按柜号百位段 |
| 找电缆 | `&WRE`，看起点/终点/长度 |
| 找 PLC 地址 | `&PLCV`，页号=卡号 |
| 找项目信息 | 封面 + 图框 + PDF metadata |

> 英语不熟练时，先读“字段名”，再读“值”。字段名重复率高，记住 100 个字段就能读大部分图框。

## 导航
[← 上一页：34 短语与短句](34-english-phrases.html) · [知识库首页](index.html) · [下一页：36 英语自测 →](36-english-quiz.html)
