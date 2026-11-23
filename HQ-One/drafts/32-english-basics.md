---
template: doc
theme: blueprint
title: 32 · 图纸英语入门：先看句型，再背词
subtitle: 图纸英语不是普通英语：名词堆叠、缩写、德英混写；先学 10 个句型
source: 26 份 EPLAN 图纸页标题 + BOM + SV + IO 表
---
图纸英语的难点不是词汇量大，而是**名词堆叠**和**缩写**。例如 `main contactor for knife bar controllers` 不是一个单词，而是“刀梁控制器的主接触器”。先掌握句型，再按功能背词。

## A 英语在图纸里的 7 个位置
| 位置 | 例子 | 读法 |
|---|---|---|
| 页标题 | `24VDC power supply` | 先说“是什么”，再说“给谁” |
| 功能组 | `=KNB Knife bar` | `=` 后是代码，空格后是英文名 |
| 设备描述 | `motor fan control` | 名词+名词，最后一个词是中心词 |
| 信号名 | `Feedback from main contactor` | `from` 后面是来源 |
| BOM 描述 | `CABLE 3X0,75MM²; CE` | 类型+规格+认证 |
| SV 特征 | `Working Width` | 特征名+取值 |
| IO 表 | `Door infeed OS channel#1` | 位置+方向+通道 |

## B 10 个句型
| # | 句型 | 图纸例子 | 中文 |
|---|---|---|---|
| 1 | A for B | `main contactor for knife bar controllers` | 刀梁控制器的主接触器 |
| 2 | A from B | `Feedback from main contactor` | 主接触器反馈 |
| 3 | A to B | `Stop-Safe to DF` | 到双面机的安全停止 |
| 4 | A of B | `loss of paper` | 断纸/失纸 |
| 5 | 过去分词+名词 | `shielded cable` | 屏蔽电缆 |
| 6 | 名词+is+状态 | `DF Acceleration is Inhibited` | DF 加速被禁止 |
| 7 | 动词开头 | `Lock the protective door` | 锁住防护门 |
| 8 | 名词+channel #n | `Door infeed OS channel#1` | 进料门操作侧通道 1 |
| 9 | A <-> B | `13545 - > 15511(exchange)` | 13545 与 15511 交换 |
| 10 | 缩写+全称 | `DF = Double Facer` | 双面机 |

## C 80 个核心词
| 英文 | 中文 | 图纸例子 |
|---|---|---|
| supply | 供电/电源 | `main power supply` |
| power | 电力/功率 | `power distribution` |
| distribution | 分配 | `400VAC power distribution` |
| main | 主/总 | `main contactor` |
| contactor | 接触器 | `charge/discharge contactor` |
| controller | 控制器 | `infeed roll controller` |
| control | 控制 | `motor fan control` |
| unit | 单元/装置 | `control unit CU320-2` |
| module | 模块 | `main module for internal estop` |
| switch | 开关 | `temperature switch` |
| terminal | 端子 | `PE terminal` |
| grounding | 接地 | `grounding connect` |
| charge | 充电 | `charge unit` |
| discharge | 放电/排出 | `discharge resistor` |
| capacitor | 电容 | `capacitors unit` |
| resistor | 电阻 | `discharge resistor` |
| bus | 母线/总线 | `DC bus` |
| potential | 电位 | `potential distribution` |
| external | 外部 | `external power supply` |
| internal | 内部 | `internal estop` |
| cabinet | 柜/柜体 | `cabinet light` |
| layout | 布置 | `cabinet layout` |
| base plate | 底板 | `base plate layout` |
| door | 门 | `safety door - infeed` |
| safety | 安全 | `safety control` |
| emergency stop / estop | 急停 | `main module for internal estop` |
| relay | 继电器 | `relay for safety door` |
| sensor | 传感器 | `paper jam sensor` |
| encoder | 编码器 | `knife bar encoder` |
| resolver | 旋变 | `resolver connect` |
| pulse | 脉冲 | `pulse distribution` |
| motor | 电机 | `main motor cooling` |
| fan | 风扇/风机 | `cooling fan` |
| cooling | 冷却 | `main motor cooling system` |
| lubrication | 润滑 | `knife edge lubrication` |
| oil | 油 | `oil pump` |
| pump | 泵 | `oil return pump` |
| pressure | 压力 | `load pressure` |
| valve | 阀 | `outfeed roll valve` |
| roll | 辊 | `infeed roll` |
| belt | 皮带 | `outfeed belt 1` |
| gap | 间隙 | `outfeed roll gap` |
| infeed | 进料 | `infeed roll controller` |
| outfeed | 出料 | `outfeed station` |
| knife | 刀 | `knife bar` |
| bar | 梁/条 | `knife bar` |
| cut | 剪切/切断 | `cut counter` |
| counter | 计数器 | `HQ1 cut counter` |
| impulse | 脉冲 | `cut impulse` |
| measuring | 测量 | `measuring roll` |
| reference | 参考/基准 | `reference proximity switch` |
| proximity | 接近 | `proximity switch` |
| limit | 限位 | `tool limit switch` |
| paper | 纸/纸板 | `paper jam` |
| jam | 卡纸/堵纸 | `paper jam sensor` |
| waste | 废料 | `waste discharge` |
| vacuum | 真空 | `vacuum unit` |
| splice | 拼接/接头 | `splice detection` |
| detection | 检测 | `splice detection` |
| laser | 激光 | `laser measuring unit` |
| light | 灯/光 | `cabinet light` |
| button | 按钮 | `operating button` |
| panel | 面板/柜 | `operating panel` |
| operating | 操作 | `operating panel` |
| interface | 接口 | `X8 interface` |
| exchange | 交换 | `13545 -> 15511(exchange)` |
| signal | 信号 | `signal exchange` |
| feedback | 反馈 | `feedback from 400VAC switch` |
| ready | 就绪 | `ready for AOC` |
| enable | 使能 | `enable` |
| inhibit | 禁止 | `DF Acceleration is Inhibited` |
| fault | 故障 | `HQ fault` |
| reset | 复位 | `Reset push button` |
| request | 请求 | `Request push button` |
| open | 打开 | `Door open possible` |
| close | 关闭 | `close` |
| lock | 锁/锁定 | `Lock the protective door` |
| protective | 防护 | `protective door` |
| service | 服务/检修 | `service socket` |
| socket | 插座 | `service socket` |
| air conditioner | 空调 | `air conditioner 13515` |
| fuse | 熔断器 | `fuse holder` |
| cable | 电缆 | `CABLE 3X0,75MM²` |
| wire | 导线 | `WIRE 150MM2` |
| connector | 连接器 | `connector` |
| plug | 插头 | `plug` |
| label | 标签 | `labelling` |
| shield | 屏蔽 | `shielded cable` |
| phase | 相 | `3-phase` |
| frequency | 频率 | `frequency converter` |
| converter | 变频器/转换器 | `frequency converter` |
| drive | 驱动 | `drive` |
| servo | 伺服 | `servo controller` |
| inverter | 逆变器 | `servo inverter` |
| brake | 制动/刹车 | `release motor brake` |
| release | 释放 | `release motor brake` |
| temperature | 温度 | `temperature switch` |
| speed | 速度 | `knife bar speed` |
| acceleration | 加速 | `acceleration` |
| deceleration | 减速 | `deceleration` |
| length | 长度 | `cut length` |
| width | 宽度 | `working width` |
| thickness | 厚度 | `board thickness` |
| position | 位置 | `sensor position` |
| angle | 角度 | `angle` |
| offset | 偏移 | `offset` |
| actual | 实际 | `actual cut length` |
| target | 目标 | `target cuts` |
| current | 当前/电流 | `current order` |
| order | 订单/顺序 | `order change` |
| next | 下一个 | `next order` |
| previous | 上一个 | `previous page` |
| page | 页 | `Previous page` |
| line | 线/行 | `Single-line` |
| tree | 树 | `Page tree` |
| list | 列表 | `Device tag list` |
| overview | 总览 | `PLC overview` |
| diagram | 图 | `Circuit diagram` |
| report | 报表 | `report` |
| legend | 图例 | `Enclosure legend` |
| part number | 部件号 | `Part number` |
| quantity | 数量 | `Quantity` |
| description | 描述 | `Function Description` |
| remark | 备注 | `Remarks` |
| option | 选配 | `Option` |
| reserve | 预留 | `Reserve` |

## D 复合名词怎么拆
| 原句 | 拆法 | 中文 |
|---|---|---|
| `main contactor for knife bar controllers` | main contactor / for / knife bar controllers | 刀梁控制器的主接触器 |
| `HQ1 main motor cooling system` | HQ1 / main motor / cooling system | HQ1 主电机冷却系统 |
| `outfeed roll gap 1 controller` | outfeed roll / gap 1 / controller | 出料辊间隙 1 控制器 |
| `paper jam sensor - outfeed below` | paper jam sensor / outfeed / below | 出料下方卡纸传感器 |
| `pulse distribution - knife bar speed` | pulse distribution / knife bar speed | 刀梁速度脉冲分配 |

## E 常见拼写错误/德英混写
| 图纸写法 | 正确/含义 | 说明 |
|---|---|---|
| `siwtch` | switch | 拼写错误 |
| `termianl` | terminal | 拼写错误 |
| `impluse` | impulse | 拼写错误 |
| `realy` | relay | 拼写错误 |
| `messuring` | measuring | 拼写错误 |
| `EntherNET` | Ethernet | 拼写错误 |
| `Allpolig` | all-pole | 德语，全极 |
| `Einpolig` | single-pole | 德语，单极 |
| `Schaltschrankaufbau` | cabinet layout | 德语，柜体布置 |
| `Typenschild` | name plate | 德语，铭牌 |
| `Sicherheitstechnik` | safety technology | 德语，安全技术 |
| `Abfallbänder` | waste belts | 德语，废料输送带 |

## F 学习方法
```flow LR
(页标题) -> 功能组
功能组 -> 设备描述
设备描述 -> 信号名
信号名 -> BOM/SV
BOM/SV -> 自测
```

- 每天 10 个词：先背“功能组词”，再背“页标题词”，最后背 BOM 机械词。
- 看到一个长名词，从右往左拆：最后一个名词是中心词。
- 看到 `from/to/for/of`，先找介词后面的对象。
- 不确定的拼写，先按图纸原样记，再对照正确拼写。

## 导航
[← 上一页：31 综合实战](31-training-task-2.html) · [知识库首页](index.html) · [下一页：33 页标题中英对照 →](33-english-page-titles.html)
