# 数据库表节点组件使用说明

## 概述

这是一个专门用于显示数据库表信息的自定义 Vue Flow 节点组件，支持显示表名、字段信息、约束条件，并提供字段级别的连接点用于建立表关系。

## 功能特性

### 1. 表信息显示
- **表名**：显示在头部，带有数据库图标
- **字段列表**：显示所有字段的名称和数据类型
- **约束标识**：用不同颜色的标签显示字段约束

### 2. 约束类型支持
- **PK (Primary Key)**：主键 - 红色标签
- **FK (Foreign Key)**：外键 - 橙色标签  
- **NN (Not Null)**：非空 - 绿色标签
- **UQ (Unique)**：唯一 - 蓝色标签

### 3. 交互功能- **展开/折叠**：点击表头右侧箭头可展开或折叠字段列表- **连接点**：每个字段都有独立的连接点，支持精确的字段级关系连接- **悬停效果**：鼠标悬停时显示连接点和高亮效果- **注释提示**：鼠标悬停在表上时显示表注释，悬停在字段上时显示字段注释

## 数据结构

### 节点数据格式

```javascript
{
  id: '表节点ID',
  type: 'database-table',
  position: { x: 600, y: 100 },
  data: {
    tableName: '表名',
    fields: [
      {
        name: '字段名',
        type: '数据类型',
        isPrimaryKey: true,    // 是否为主键
        isForeignKey: false,   // 是否为外键
        isNotNull: true,       // 是否非空
        isUnique: false        // 是否唯一
      }
      // ... 更多字段
    ]
  }
}
```

## 使用示例

```javascript
// 用户表
{
  id: 'users-table',
  type: 'database-table',
  position: { x: 600, y: 100 },
  data: {
    tableName: 'users',
    fields: [
      { name: 'id', type: 'INT', isPrimaryKey: true, isNotNull: true },
      { name: 'username', type: 'VARCHAR(50)', isNotNull: true, isUnique: true },
      { name: 'email', type: 'VARCHAR(100)', isNotNull: true },
      { name: 'created_at', type: 'TIMESTAMP', isNotNull: true }
    ]
  }
}
``` 