# Task 02：AZARIA 追加 CMC/Cut-to-Mark + 真空 + 远程操作箱

## 文件
- `change-request.md`：模拟变更请求
- `submission-template.md`：提交模板
- `answer-key.md`：标准答案（页/设备/端子/电缆/IO/BOM）
- `bom-diff.csv`：主要新增物料
- `base-azaria-focus.pdf`：AZARIA 起始页（PDF 66–67、76、107、113–118、130、136、158–164、167–171）
- `target-ansel-focus.pdf`：ANSEL 目标页（同页段）
- `target-cmc-page-1920.pdf`、`target-vac-page-801.pdf`：目标单页
- `answer-ansel-pdf113-cmc1920.png`、`answer-ansel-pdf76-vac801.png`、`before-azaria-pdf113.png`

## 用法
1. 读 `change-request.md`。
2. 打开起始/目标 focus PDF 对照；先看 CMC 六页，再看真空两页，最后看 DEX/PLCV/LAY。
3. 在 EPLAN 中改 ANWEN/AZARIA 源项目；只有 PDF 就做标注+变更清单。
4. 按 `submission-template.md` 提交。
5. 用 `answer-key.md` 自评或师傅评分。

## 注意
- 真实订单构造的训练任务，变更请求是模拟的；目标图纸是 ANSEL 真实导出。
- 只评 CMC/VAC/DEX 585/590/PLCV/端子电缆/BOM 相关范围；宽度 3350 vs 2800、客户、其他选配不计。
- ANSEL 没有 3401 BOM 导出，本题 BOM 以目标箱柜清单 154–171 为准；SAP BOM 需另行导出核对。
