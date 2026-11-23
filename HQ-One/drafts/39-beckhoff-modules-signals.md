---
template: doc
theme: blueprint
title: 39 · Beckhoff 模块为什么有十几二十个
subtitle: 不是“一个信号一个模块”；按安全、通道数、选配、柜号拆开
source: V3.3 矩阵 + AISLING/ARAMIS/AUDRIC 实际 PLCV 页
---
先给结论：一个 EL 模块有 4/8/16 个通道，图纸上“十几二十个模块”对应的是 **150–200 个信号通道**。模块多，是因为信号要按安全/标准、输入/输出、模拟/数字、快速/普通、柜号/选配分组，还要预留 Reserve。

## A 数量对照
| 项目/矩阵 | I/O 模块数 | 逻辑通道 | 说明 |
|---|---:|---:|---|
| V3.3 通用矩阵 | 40 | 422 | 全选配上限：22 入/18 出 |
| AISLING SQ-M+ | 16 | 152 | 实际订单；标准 I/O 用 EL1409/EL2409 |
| ARAMIS HQ-M | 21 | 206 | 双刀 HQ2，模块更多 |
| AUDRIC SQ-N | 16 | 178 | 精简/降配 |

> 40 是矩阵上限，不等于每个订单都装 40 个。实际订单按选配裁剪；双刀、CMC、真空、Fanfold、门锁会增加模块。

## B 模块类型与通道
| 类别 | 典型型号 | 通道/模块 | 主要信号 |
|---|---|---|---|
| 安全输入 8 通道 | EL1918 | 8 | 门开关双通道 |
| 安全输入 4 通道 | EL1904 | 4 | 急停、LOTO、安全中心 |
| 安全输出 4 通道 | EL2904 | 4 | STO、Stop-Safe、安全泄压 |
| 标准输入 16 通道 | EL1809/EL1409 | 16 | 按钮、反馈、邻机、选配 |
| 标准输出 16 通道 | EL2809/EL2409 | 16 | 阀、灯、接触器、Good Cut |
| 模拟输入 2 通道 | EL3002 | 2 | 刀速、DF 速度 |
| 模拟输出 4 通道 | EL4074 | 4 | 压力/速度给定 |
| 模拟输出 2 通道 | EL4002 | 2 | 第三方速度给定 |
| 编码器接口 | EL5102 | 2 | 测量辊、刀辊、激光 |
| 快速数字输入 | EL1258 | 8 | 剪切脉冲、铝箔检测 |

> V3.3 的 40 个模块 = 安全 8 + 标准数字 22 + 模拟 6 + 编码器 3 + 快速 DI 1。实际订单用 EL1409/EL2409 替代 EL1809/EL2809，数量会变。

## C 都接了哪些信号
| 信号组 | 典型信号 | 模块类型 |
|---|---|---|
| 安全输入 | Door infeed/outfeed OS/DS、Estop from AS-M/DF/SR、LOTO、Tool Holder、安全中心急停/Stop | EL1918/EL1904 |
| 安全输出 | Stop-Safe to DF、Main drive STO、ELSE Drive STO、Stop-Safe to safety center、Valve network pressure | EL2904 |
| 面板/操作 | AOC Start、HQ On、Reset、Dry-end Jog、Cuts Quantity Adjust、Infeed Roll Up/Down | 标准 DI |
| 驱动反馈 | Main contactor feedback、Charge feedback、Chiller feedback、Motor fault | 标准 DI |
| 邻机接口 | DF On/Speed up/down、SR Ready、AS Ready、AS Changeover、KQ Ready | 标准 DI |
| 输出-剪切 | Good Cut to AS（80ms）、Cut pulse counting、Hq2 knife cut pulse | 标准 DO |
| 输出-阀 | 进料辊升降、出料辊间隙、排废翻板、压紧、真空阀 | 标准 DO |
| 输出-辅助 | 油泵接触器、刀口润滑、柜灯、门锁、CMC | 标准 DO |
| 模拟输入 | Knife Speed from CLPC、DF Speed（单机） | EL3002 |
| 模拟输出 | 进料/出料压力、SR Speed 0–20mA、真空泵控制 | EL4074/EL4002 |
| 编码器 | 测量辊、刀辊、激光测速 | EL5102 |
| 快速计数 | HQ1/HQ2 cut pulse、KQ/RDS pulse、Paper exist、Aluminium Tape | EL1258 |

> 同一模块名可能重复：安全 DI5 与标准 DI5 是不同型号/地址；必须用“型号+地址”做主键。

## D 为什么不是“一个信号一个模块”
| 原因 | 说明 |
|---|---|
| 通道容量 | 16DI/16DO 一个模块覆盖 16 个信号；4DI 安全模块只覆盖 4 路 |
| 安全隔离 | 安全信号必须走 EL1918/1904/2904，不能混标准模块 |
| 输入/输出分开 | DI 与 DO 不能在同一模块 |
| 模拟/数字分开 | AI/AO 需要 EL3002/4074/4002 |
| 快速/普通分开 | 剪切脉冲需要 EL1258 时间戳 |
| 编码器专用 | EL5102 两通道，A/B/Z 差分 |
| 选配分组 | HQ2、CMC、真空、Fanfold、门锁各自成组，便于裁剪 |
| 柜号/分布式 | 信号分布在 13501/13511/13531/13541，模块跟着柜走 |
| Reserve | 预留 10–20% 通道，便于改单 |

## E 订单变化时模块怎么变
| 变化 | 增加什么 |
|---|---|
| 单刀→双刀 | HQ2 的 DI/DO、HQ2 STO、HQ2 编码器、HQ2 门/急停 |
| 加 CMC | DI12/DO10 + CMC 传感器/阀 |
| 加真空 | DI/DO + 真空电机/阀；模拟量按项目 |
| 加 Fanfold | DI13/DI14 |
| 加门锁 | DO11/DO12 |
| 加安全中心 | EL1904×2 + EL2904×2（EU） |
| 换柜号代际 | 模块跟着 13501/13511/13531/13541 重新分配 |

## F 核对顺序
```flow LR
(IO表信号) -> 模块型号
模块型号 -> 地址
地址 -> PLCV页
PLCV页 -> 端子/电缆
端子/电缆 -> 现场设备
```

| 步骤 | 看什么 |
|---|---|
| 1 | Content：Safety/General/Option |
| 2 | Module：DI/DO/AI/AO + 型号 |
| 3 | Address：I/Q/PIW/PQW |
| 4 | Terminal/Contact：端子/通道 |
| 5 | PLCV：页号=卡号 |
| 6 | 端子图/电缆图：现场落点 |

> 不要只数模块名；同名 DI5/DI6/DO2/AO1 可能重复。也不要只数模块数；一个 16DI 模块等于 16 个信号。

## 导航
[← 上一页：38 主驱动选型](38-drive-selection.html) · [知识库首页](index.html) · [下一页：40 Checklist 矩阵 →](40-checklist-matrix.html)
