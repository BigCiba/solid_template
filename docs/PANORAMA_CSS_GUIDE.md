# Panorama CSS/LESS 编写指南

## ⚠️ 重要：Dota 2 Panorama 引擎的 CSS 限制

Dota 2 Panorama 引擎**不支持 CSS 简写属性**（shorthand properties）。所有样式必须使用完整的长格式属性。

---

## 🚫 禁止使用的简写属性

### 1. `transition` (过渡)

❌ **错误写法（不会生效）：**
```less
.MyButton {
    transition: all 0.3s ease;
}

.MyPanel {
    transition: opacity 0.5s ease-in-out, transform 0.3s linear;
}
```

✅ **正确写法：**
```less
.MyButton {
    transition-property: all;
    transition-duration: 0.3s;
    transition-timing-function: ease;
}

.MyPanel {
    transition-property: opacity, transform;
    transition-duration: 0.5s, 0.3s;
    transition-timing-function: ease-in-out, linear;
}
```

**可用的完整属性：**
- `transition-property` - 要过渡的属性（如 `opacity`, `brightness`, `wash-color`）
- `transition-duration` - 持续时间（如 `0.3s`, `500ms`）
- `transition-timing-function` - 时间函数（如 `ease`, `linear`, `ease-in-out`）
- `transition-delay` - 延迟时间（可选）

---

### 2. `animation` (动画)

❌ **错误写法：**
```less
.Spinner {
    animation: rotate 1s linear infinite;
}

.FadeIn {
    animation: fadeIn 0.5s ease-in-out forwards;
}
```

✅ **正确写法：**
```less
.Spinner {
    animation-name: rotate;
    animation-duration: 1s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
}

.FadeIn {
    animation-name: fadeIn;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    animation-fill-mode: forwards;
}
```

**可用的完整属性：**
- `animation-name` - 动画名称（对应 `@keyframes` 名称）
- `animation-duration` - 持续时间
- `animation-timing-function` - 时间函数
- `animation-delay` - 延迟时间
- `animation-iteration-count` - 迭代次数（数字或 `infinite`）
- `animation-direction` - 方向（`normal`, `reverse`, `alternate`）
- `animation-fill-mode` - 填充模式（`forwards`, `backwards`, `both`）
- `animation-play-state` - 播放状态（`running`, `paused`）

---

### 3. `background` (背景)

❌ **错误写法：**
```less
.Panel {
    background: url("...") no-repeat center;
}

.Hero {
    background: #ff0000 url("...") repeat-x 50% 50%;
}
```

✅ **正确写法：**
```less
.Panel {
    background-image: url("...");
    background-repeat: no-repeat;
    background-position: center;
}

.Hero {
    background-color: #ff0000;
    background-image: url("...");
    background-repeat: repeat-x;
    background-position: 50% 50%;
}
```

**可用的完整属性：**
- `background-color` - 背景颜色
- `background-image` - 背景图片
- `background-repeat` - 重复方式（`repeat`, `no-repeat`, `repeat-x`, `repeat-y`）
- `background-position` - 位置
- `background-size` - 尺寸（`100%`, `cover`, `contain`）

---

### 4. `border` (边框)

❌ **错误写法：**
```less
.Box {
    border: 1px solid #ffffff;
}

.Card {
    border-top: 2px dashed red;
}
```

✅ **正确写法：**
```less
.Box {
    border-width: 1px;
    border-style: solid;
    border-color: #ffffff;
}

.Card {
    border-top-width: 2px;
    border-top-style: dashed;
    border-top-color: red;
}
```

---

### 5. `margin` / `padding` (外边距/内边距)

⚠️ **部分支持** - 建议分开写

❌ **不推荐：**
```less
.Panel {
    margin: 10px 20px 30px 40px;
    padding: 5px 10px;
}
```

✅ **推荐：**
```less
.Panel {
    margin-top: 10px;
    margin-right: 20px;
    margin-bottom: 30px;
    margin-left: 40px;
    
    padding-top: 5px;
    padding-right: 10px;
    padding-bottom: 5px;
    padding-left: 10px;
}
```

💡 **或使用单值（四边相同时）：**
```less
.Panel {
    margin: 10px;  // 四边都是 10px（这种简写可能支持）
    padding: 5px;  // 四边都是 5px
}
```

---

### 6. `font` (字体)

❌ **错误写法：**
```less
.Text {
    font: bold 16px/1.5 Arial, sans-serif;
}
```

✅ **正确写法：**
```less
.Text {
    font-weight: bold;
    font-size: 16px;
    line-height: 1.5;
    font-family: Arial, sans-serif;
}
```

---

## ✅ 实际项目示例

### 示例 1: 按钮过渡效果

```less
.EOM_Button {
    // ✅ 正确 - 分开定义
    transition-property: brightness, color;
    transition-duration: 0.05s;
    transition-timing-function: ease-in-out;
    
    &:hover {
        brightness: 1.5;
    }
    
    Label {
        // ✅ 正确 - Label 的过渡
        transition-property: color, opacity;
        transition-duration: 0.35s;
        transition-timing-function: ease-in-out;
    }
}
```

### 示例 2: 旋转动画

```less
.LoadingSpinner {
    // ✅ 正确 - 完整的动画属性
    animation-name: SpinnerRotate;
    animation-duration: 1.0s;
    animation-timing-function: linear;
    animation-iteration-count: infinite;
    animation-direction: reverse;
}

@keyframes SpinnerRotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}
```

### 示例 3: 背景图片

```less
.HeroCard {
    // ✅ 正确 - 分开定义背景属性
    background-image: url("file://{images}/heroes/hero_bg.png");
    background-size: 100%;
    background-repeat: no-repeat;
    background-position: center center;
}
```

---

## 🎯 快速检查清单

在编写 LESS 样式时，检查以下内容：

- [ ] 所有 `transition` 都已展开为 `transition-property/duration/timing-function`
- [ ] 所有 `animation` 都已展开为 `animation-name/duration/timing-function` 等
- [ ] 所有 `background` 都已展开为 `background-image/size/repeat` 等
- [ ] `border` 使用完整的 `border-width/style/color`
- [ ] 复杂的 `margin/padding` 使用单独的方向属性
- [ ] `font` 相关使用单独的 `font-size/weight/family` 等

---

## 🔧 LESS 变量化技巧

可以使用 LESS 变量来简化重复的过渡/动画定义：

```less
// 定义常用的过渡时间
@transition-fast: 0.15s;
@transition-normal: 0.3s;
@transition-slow: 0.5s;

// 定义常用的时间函数
@ease-out: ease-out;
@ease-in-out: ease-in-out;

.MyButton {
    transition-property: opacity, brightness;
    transition-duration: @transition-fast;
    transition-timing-function: @ease-in-out;
}
```

---

## 📚 Panorama 特有的 CSS 属性

除了标准 CSS 属性，Panorama 还支持一些特有属性：

### 常用的 Panorama 专属属性：

```less
.Panel {
    // 亮度调整
    brightness: 1.5;
    
    // 色彩调整
    wash-color: #ff0000;
    saturation: 0.5;
    hue-rotation: 180deg;
    
    // 布局
    flow-children: right;  // 或 down
    align: center center;
    horizontal-align: center;
    vertical-align: middle;
    
    // UI 缩放
    ui-scale: 120%;
    
    // 声音
    sound: "ui_generic_button_click";
}
```

---

## ⚡ 性能提示

1. **优先使用 Panorama 特有属性**：如 `brightness` 比 CSS filter 性能更好
2. **避免过度使用过渡**：只在需要的属性上使用 transition
3. **使用合理的时长**：过长的动画会影响用户体验

---

## 🐛 常见错误

### 错误 1: 样式不生效
**原因**：使用了简写属性  
**解决**：展开为完整属性

### 错误 2: 动画不播放
**原因**：`animation` 简写不支持  
**解决**：使用 `animation-name`, `animation-duration` 等单独属性

### 错误 3: 背景图不显示
**原因**：使用 `background` 简写  
**解决**：分别设置 `background-image`, `background-size` 等

---

## 📖 参考资源

- 项目示例：`src/components/EOMDesign/Input/EOM_Button/EOM_Button.less`
- Panorama 类型定义：`src/declarations/panel.d.ts`
- 官方文档：Dota 2 Modding 社区

---

## 💡 记住

> **在 Panorama 中，永远使用完整的属性名称，避免任何 CSS 简写！**

这是 Panorama 引擎的硬性限制，不遵守会导致样式完全不生效且没有错误提示。
