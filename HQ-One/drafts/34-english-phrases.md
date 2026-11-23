---
template: doc
theme: blueprint
title: 34 · 短语与短句：信号、SV、IO、BOM
subtitle: 图纸上真正出现的短句；先记“动作+对象”，再记语法
source: 26 份图纸信号名 + SV 特征 + IO 矩阵 + 3401 BOM
---
图纸短句大多省略主语，只保留“动作+对象”。例如 `Door open possible` 不是完整句子，意思是“允许开门”。本页按场景分组，看到原句就能对上中文。

## A 信号与动作（50）
| 图纸英文 | 中文 | 说明 |
|---|---|---|
| Good Cut to AS (80ms Puls) | 良品剪切到堆码机（80ms 脉冲） | `Puls` 应为 pulse |
| Ejecting Waste | 正在排废 | 换单/接头 |
| DF Acceleration is Inhibited | DF 加速被禁止 | HQ 到极限 |
| Stop-Safe to DF | 到双面机的安全停止 | 安全输出 |
| Stop-Safe to safety center | 到安全中心的安全停止 | EU |
| Door infeed OS channel#1 | 进料门操作侧通道 1 | OS=操作侧 |
| Door Infeed DS channel#1 | 进料门驱动侧通道 1 | DS=驱动侧 |
| Door Outfeed OS channel#1 | 出料门操作侧通道 1 | 双通道 |
| Door Outfeed DS channel#1 | 出料门驱动侧通道 1 | 双通道 |
| Estop From AS-M | 来自堆码机的急停 | 外部急停 |
| Estop From DF | 来自双面机的急停 | 外部急停 |
| Door Estop From SR | 来自纵切机的门急停 | SR |
| Waste Evacuation Door | 废料排出门 | 安全门 |
| LOTO channel#1 | 上锁挂牌通道 1 | Lockout/Tagout |
| E-Stop button | 急停按钮 | 本地 |
| Tool Holder limit switch | 刀架限位开关 | 安全 |
| E-stop from safety center | 来自安全中心的急停 | EU |
| Stop-safety from safety center | 来自安全中心的安全停止 | EU |
| Main drive STO | 主传动 STO | 安全输出 |
| ELSE Drive STO | 其余驱动 STO | EU |
| Valve network pressure | 网络压力阀 | 安全泄压 |
| Door open possible | 允许开门 | 门锁 |
| Door open acknowledged | 开门已确认 | 门锁 |
| Lock the protective door | 锁住防护门 | 门锁 |
| Reset/Request push button | 复位/请求按钮 | 操作箱 |
| Cuts Quantity Adjust +1/-1/+10 | 张数调整 +1/-1/+10 | 面板/AS |
| target cuts +1/-1 | 目标张数 ±1 | 订单尾数 |
| AOC start Prewarning | 换单预警 | AOC |
| AOC Running | 换单运行中 | AOC |
| SR Knives Changeover | SR 换刀 | 纵切 |
| SR Scorers RS11/RS12 Engage/Disengage | SR 压线轮 11/12 下压/分离 | 纵切 |
| SR Speed | SR 速度 | 0–20mA |
| Software Order Change to SR | 软件换单到 SR | 不走机械缺口 |
| Require SR Drives Enable | 请求 SR 驱动使能 | 联锁 |
| SR Ready for Operation | SR 运行就绪 | 联锁 |
| SR Ready for AOC | SR 换单就绪 | 联锁 |
| Good Cut to AS1/AS2 | 良品剪切到 AS1/AS2 | 堆码 |
| Ejecting Waste HQ1/HQ2 | HQ1/HQ2 排废 | 堆码 |
| Waste Belt On AS1/AS2 | AS1/AS2 废料带启动 | 堆码 |
| As1/As2 Changeover | AS1/AS2 换单 | 堆码 |
| Require AS Drives Enable | 请求 AS 驱动使能 | 联锁 |
| HQ1/HQ2 cut impulse | HQ1/HQ2 剪切脉冲 | 每转一次 |
| Cuts Quantity Adjust | 张数调整 | 运行中 |
| Cut pulse of HQ proximity switch | HQ 接近开关剪切脉冲 | EL1258 |
| Charge feedback | 充电反馈 | 预充 |
| Main contactor feedback | 主接触器反馈 | 联锁 |
| Oil Pressure OK | 油压正常 | 润滑 |
| Max Speed Reached | 已到最高速度 | 指示 |
| HQ Fault | HQ 故障 | 指示 |
| Paper exists | 有纸 | 纸存在 |
| Ready for AOC | 换单就绪 | AOC |

## B SV 特征与取值（60）
| 英文 | 中文 | 说明 |
|---|---|---|
| Machine Type | 机型 | HQ-M/SQ-M+/SQ-M/SQ-N |
| Scope of delivery | 供货范围 | New machine |
| Working Width | 工作幅宽 | mm |
| Drive side (paper going) | 操作侧（纸板运行方向） | Left/Right |
| Control | 控制系统 | Beckhoff |
| Cabinet cooling | 柜体冷却 | water/air cooled |
| integrated AOC control | 集成 AOC 控制 | Yes/No |
| Placement | 布置位置 | 1 / 1+2 |
| Cut length diagram | 切长图 | 含 WW/kW/刀梁 |
| Main Drive | 主传动 | 2x45kW 等 |
| Main drive cooling | 主传动冷却 | air/water/liquid |
| Knife Bar | 刀梁（上刀辊+下刀杆） | Steel/CFK |
| Knife | 刀型 | double serrated/reclining |
| Cutting edge lubrication | 刀口润滑 | Yes/No |
| Jam detection | 卡纸检测 | Yes/No |
| Frame | 机架 | Simplex/Duplex 925 |
| Infeed version | 进料形式 | Twin-roll infeed |
| Loading system infeed | 进料加载系统 | EP/pneumatic |
| outfeed version | 出料形式 | Outfeed station |
| Loading system outfeed | 出料加载系统 | Load control |
| internal Table | 内部工作台 | Stainless Steel |
| OPTIONS | 选配 | 分区标题 |
| Waste evacuation | 废料排出 | HQ-1 |
| Splice Detection | 拼接检测 | Yes/No |
| Laser speed measurement | 激光测速 | Yes/No |
| CUT TO MARK CONTROL | 切标控制 | CMC |
| CORRUGATOR OPTIONS | 瓦线选配 | 分区标题 |
| Comprehensive options | 综合选配 | TAB |
| SPECIAL | 特殊项 | 分区标题 |
| Special Variants (1–5) | 特殊变体 1–5 | 文字描述 |
| CONFIRM CONF | 配置确认 | Yes |
| DEVIATION FROM STANDARD | 偏离标准 | 必须评估 |
| Electrical standard | 电气标准 | EU/CN |
| Paper going height at HQ-1 | HQ1 纸板高度 | mm |
| Cooling switch cabinets | 开关柜冷却方式 | front/top |
| External encoder mounting | 外置编码器安装 | Yes/No |
| Stacker | 堆码机 | AS-A |
| Working width Stacker | 堆码幅宽 | mm |
| Encoder paper web | 纸幅编码器 | Wheel+Laser |
| New rotary shear | 新旋转剪 | Yes/No |
| Outfeed rotary shear | 出料旋转剪 | other/not relevant |
| New Tables | 新工作台 | Yes/No |
| Cut-to-mark | 切标 | Yes/No |
| Production site | 生产地 | Shanghai |
| Position in funct. location | 功能位置 | HQ - Cutoff |
| COLOURS | 颜色 | 分区标题 |
| Design Concept | 设计概念 | Icon Design |
| Handrail Colour | 扶手颜色 | RAL 7024 |
| Inner Colour | 内部颜色 | RAL 7024 |
| Cover Colour | 外罩颜色 | RAL 7047 |
| Safety Colour | 安全色 | RAL 1023 |
| Accent Colour | 点缀色 | RAL 7024 |
| New machine | 新机 | Scope of delivery |
| Left / Right | 左/右 | Drive side |
| water cooled / air cooled | 水冷/风冷 | Cabinet cooling |
| Yes / No | 是/否 | 选项 |
| Simplex / Duplex 925 | 单刀/双刀 925 | Frame |
| Twin-roll infeed | 双辊进料 | Infeed |
| EP (automatic) | EP 自动 | Loading system |
| pneumatic pressure regulation | 气动压力调节 | Loading system |
| double motor outfeed | 双电机出料 | Outfeed |
| motor gap control | 电机间隙控制 | Outfeed |
| Load control | 负载控制 | Outfeed |
| Stainless Steel | 不锈钢 | Table |
| HQ-1 | HQ1 | Waste evacuation |
| EU / CN | 欧洲/中国标准 | Electrical standard |
| front-mounted water-cooling | 前装水冷 | Cooling switch cabinets |
| top-mounted air-cooling | 顶装风冷 | Cooling switch cabinets |
| Wheel + Laser | 轮式+激光 | Encoder paper web |
| AS-A | AS-A 堆码机 | Stacker |
| other / not relevant | 其他/不相关 | Outfeed rotary shear |

## C IO 表字段与信号（40）
| 英文 | 中文 | 说明 |
|---|---|---|
| Content | 内容/配置分类 | 列名 |
| Module | 模块 | 列名 |
| Address | 地址 | 列名 |
| Terminal | 端子 | 列名 |
| Contact | 触点/通道 | 列名 |
| Function Description | 功能描述 | 列名 |
| Remarks | 备注 | 列名 |
| Safety | 安全 | Content |
| General | 通用/标配 | Content |
| General (Option) | 通用选配 | Content |
| HQ2 exist (Option) | HQ2 选配 | Content |
| CMC (Option) | CMC 选配 | Content |
| BHS Fanfold exist (option) | BHS Fanfold 选配 | Content |
| Universal Fanfold exist (option) | Universal Fanfold 选配 | Content |
| AI (Option) / AO (Option) | 模拟输入/输出选配 | Content |
| Measuring roll-HQ1 | 测量辊-HQ1 | Content |
| Reserve / Reserved | 预留 | 信号 |
| Option | 选配 | 信号 |
| 8DI_I200 | 8 路安全输入，基地址 I200 | 地址 |
| 4DI_I201 | 4 路安全输入，基地址 I201 | 地址 |
| 16DI_I100 | 16 路标准输入，基地址 I100 | 地址 |
| 16DO_O100 | 16 路标准输出，基地址 O100 | 地址 |
| 2AI_PIW120 | 2 路模拟输入，基字 PIW120 | 地址 |
| 4AQI_PQW140 | 4 路模拟输出，基字 PQW140 | 地址 |
| EC_130 | 编码器通道 130 | 地址 |
| DI / DO | 数字输入/输出 | 类型 |
| AI / AO | 模拟输入/输出 | 类型 |
| channel#1 | 通道 1 | 信号名 |
| OS / DS | 操作侧/驱动侧 | 方向 |
| Safety relevant | 安全相关 | 图框/清单 |
| Stop-Safe | 安全停止 | 安全 |
| STO | 安全转矩关断 | 安全 |
| Feedback | 反馈 | 信号 |
| Ready | 就绪 | 状态 |
| Enable | 使能 | 状态 |
| Inhibit | 禁止 | 状态 |
| Fault | 故障 | 状态 |
| Reset | 复位 | 动作 |
| Request | 请求 | 动作 |

## D BOM 电气物料（50）
| 英文 | 中文 | 说明 |
|---|---|---|
| CABLE | 电缆 | 含芯数/截面 |
| WIRE | 导线 | 单根 |
| TERMINAL | 端子 | 端子排 |
| TERMINAL BOX | 端子箱 | 现场 |
| END SLEEVE FOR STRANDS | 线端套管 | 多股线 |
| LABELLING | 标签 | 线号/端子 |
| SCREWED JOINT | 螺纹接头 | 电缆格兰 |
| CABLE GLAND | 电缆密封接头 | 格兰 |
| FUSE | 熔断器 | 保护 |
| FUSE HOLDER | 熔断器座 | 保护 |
| PROTECTIVE SWITCH | 保护开关 | 断路器 |
| CONTACTOR | 接触器 | 主回路 |
| RELAY | 继电器 | 信号 |
| POWER SUPPLY | 电源 | 24V |
| FREQUENCY CONVERTER | 变频器 | 主传动 |
| SERVO CONTROLLER | 伺服控制器 | i950 |
| SERVO MOTOR | 伺服电机 | 辅助轴 |
| GEAR MOTOR | 减速电机 | 辅助 |
| MOTOR | 电机 | 通用 |
| MODULE | 模块 | PLC/驱动 |
| COMMUNICATION MODULE | 通信模块 | 网络 |
| INPUT MODULE | 输入模块 | DI/AI |
| OUTPUT MODULE | 输出模块 | DO/AO |
| SAFETY SWITCH | 安全开关 | 门/急停 |
| LIMIT SWITCH | 限位开关 | 位置 |
| PROXIMITY SWITCH | 接近开关 | 检测 |
| SENSOR | 传感器 | 通用 |
| LASER SYSTEM | 激光系统 | 测速 |
| AIR CONDITIONING | 空调 | 柜冷 |
| FAN | 风扇 | 柜冷/电机 |
| HEAT EXCHANGER | 热交换器 | 柜冷 |
| SWITCH CABINET | 开关柜 | 柜体 |
| CONTROL PANEL | 控制面板 | 操作 |
| BUS BAR | 母排 | 配电 |
| LAMP | 灯 | 指示 |
| PUSH BUTTON | 按钮 | 操作 |
| SELECTOR SWITCH | 选择开关 | 操作 |
| TERMINAL STRIP | 端子排 | 接线 |
| MARKING | 标记 | 端子/线 |
| SHIELD | 屏蔽 | 电缆 |
| PLUG | 插头 | 连接 |
| SOCKET | 插座 | 检修 |
| CABLE DUCT | 线槽 | 布线 |
| TERMINAL BLOCK | 端子块 | 接线 |
| JUMPER | 短接片 | 端子 |
| END PLATE | 端板 | 端子附件 |
| END STOP | 终端固定件 | 端子附件 |
| COVER | 保护罩 | 端子附件 |
| MARKING CARD | 标记卡 | 端子附件 |
| TERMINAL STRIP MARKING | 端子排标记卡 | 端子附件 |

## E 短句与图框（35）
| 英文 | 中文 | 说明 |
|---|---|---|
| Copyright BHS Corrugated GmbH All rights reserved | BHS 版权所有 | 图框 |
| Previous page | 上一页 | 图框 |
| Next page | 下一页 | 图框 |
| Changed by | 修改人 | 图框 |
| Created on | 创建日期 | 图框 |
| Edited on | 修改日期 | 图框 |
| Sales order | 销售订单 | 图框 |
| Item | 行项目 | 图框 |
| Drawing number | 图号 | 图框 |
| Customer | 客户 | 图框 |
| Country | 国家 | 图框 |
| Location | 地点 | 图框 |
| Code word | 项目代号 | 图框 |
| Main equipment number | 主设备号 | 图框 |
| Additional equipment number | 附加设备号 | 图框 |
| Version Hardware | 硬件版本 | 图框 |
| Number of pages | 页数 | 图框 |
| Page | 页 | 图框 |
| Function group | 功能组 | 图框 |
| plant | 工厂 | 图框 |
| Circuit diagram | 电路图 | 图框 |
| General information | 通用信息 | 图框 |
| Title page / cover sheet | 标题页/封面 | 图框 |
| Table of contents | 目录 | 图框 |
| Enclosure legend | 箱柜设备清单 | 图框 |
| Part number | 部件号 | 清单 |
| Quantity | 数量 | 清单 |
| Description | 描述 | 清单 |
| Remarks | 备注 | 清单 |
| Type | 型号 | 清单 |
| Safety relevant | 安全相关 | 清单 |
| Position | 位置 | 清单 |
| Sheet | 图页 | 清单 |
| Full DT | 完整设备标识 | EPLAN |
| Displayed DT | 显示设备标识 | EPLAN |
| Connection point designation | 连接点代号 | EPLAN |

## F 学习提示
| 现象 | 读法 |
|---|---|
| 名词堆叠 | 从右往左拆：最后一个名词是中心词 |
| 省略主语 | 动作句默认“系统/PLC”为主语 |
| 介词短语 | `from` 是来源，`to` 是去向，`for` 是用途 |
| 缩写 | 先查 12 页缩写表，再按上下文猜 |
| 拼写错误 | 保留原词，备注正确拼写，不要改源文件 |
| 德英混写 | 看到 `Abfall`/`Schrank`/`Typenschild` 先按德语查 |

## 导航
[← 上一页：33 页标题](33-english-page-titles.html) · [知识库首页](index.html) · [下一页：35 图框与 EPLAN →](35-english-fields-eplan.html)
