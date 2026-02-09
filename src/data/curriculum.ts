// K-12 curriculum data organized by school level, grade, subject
// Based on 2026 Chinese national curriculum standards (人教版)

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  type: "video" | "exercise" | "reading";
}

export interface Chapter {
  id: number;
  title: string;
  lessons: Lesson[];
  progress: number;
}

export interface SubjectData {
  id: string;
  label: string;
  icon: string;
  chapters: Chapter[];
}

export interface GradeData {
  id: string;
  label: string;
  shortLabel: string;
  subjects: SubjectData[];
}

export interface SchoolLevel {
  id: string;
  label: string;
  grades: GradeData[];
}

// =====================
// 小学 (Elementary School)
// =====================

const mathGrade1: Chapter[] = [
  {
    id: 1, title: "第一单元 准备课", progress: 0,
    lessons: [
      { id: "m1-1-1", title: "1.1 数一数", duration: "30分钟", completed: false, type: "video" },
      { id: "m1-1-2", title: "1.2 比多少", duration: "30分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二单元 位置", progress: 0,
    lessons: [
      { id: "m1-2-1", title: "2.1 上、下、前、后", duration: "30分钟", completed: false, type: "video" },
      { id: "m1-2-2", title: "2.2 左、右", duration: "30分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第三单元 1~5的认识和加减法", progress: 0,
    lessons: [
      { id: "m1-3-1", title: "3.1 1~5的认识", duration: "35分钟", completed: false, type: "video" },
      { id: "m1-3-2", title: "3.2 加法", duration: "35分钟", completed: false, type: "video" },
      { id: "m1-3-3", title: "3.3 减法", duration: "35分钟", completed: false, type: "video" },
      { id: "m1-3-4", title: "3.4 0的认识和加减法", duration: "30分钟", completed: false, type: "video" },
      { id: "m1-3-5", title: "单元练习", duration: "25分钟", completed: false, type: "exercise" },
    ],
  },
  {
    id: 4, title: "第四单元 认识图形（一）", progress: 0,
    lessons: [
      { id: "m1-4-1", title: "4.1 认识立体图形", duration: "35分钟", completed: false, type: "video" },
      { id: "m1-4-2", title: "单元练习", duration: "25分钟", completed: false, type: "exercise" },
    ],
  },
  {
    id: 5, title: "第五单元 6~10的认识和加减法", progress: 0,
    lessons: [
      { id: "m1-5-1", title: "5.1 6和7的认识", duration: "35分钟", completed: false, type: "video" },
      { id: "m1-5-2", title: "5.2 8和9的认识", duration: "35分钟", completed: false, type: "video" },
      { id: "m1-5-3", title: "5.3 10的认识", duration: "35分钟", completed: false, type: "video" },
      { id: "m1-5-4", title: "5.4 连加连减", duration: "35分钟", completed: false, type: "video" },
      { id: "m1-5-5", title: "单元练习", duration: "25分钟", completed: false, type: "exercise" },
    ],
  },
];

const mathGrade2: Chapter[] = [
  {
    id: 1, title: "第一单元 长度单位", progress: 0,
    lessons: [
      { id: "m2-1-1", title: "1.1 统一长度单位", duration: "35分钟", completed: false, type: "video" },
      { id: "m2-1-2", title: "1.2 认识厘米 用厘米量", duration: "35分钟", completed: false, type: "video" },
      { id: "m2-1-3", title: "1.3 认识米 用米量", duration: "35分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二单元 100以内的加法和减法（二）", progress: 0,
    lessons: [
      { id: "m2-2-1", title: "2.1 两位数加两位数", duration: "40分钟", completed: false, type: "video" },
      { id: "m2-2-2", title: "2.2 两位数减两位数", duration: "40分钟", completed: false, type: "video" },
      { id: "m2-2-3", title: "2.3 连加连减和加减混合", duration: "40分钟", completed: false, type: "video" },
      { id: "m2-2-4", title: "单元练习", duration: "30分钟", completed: false, type: "exercise" },
    ],
  },
  {
    id: 3, title: "第三单元 角的初步认识", progress: 0,
    lessons: [
      { id: "m2-3-1", title: "3.1 认识角", duration: "35分钟", completed: false, type: "video" },
      { id: "m2-3-2", title: "3.2 直角的初步认识", duration: "35分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 4, title: "第四单元 表内乘法（一）", progress: 0,
    lessons: [
      { id: "m2-4-1", title: "4.1 乘法的初步认识", duration: "40分钟", completed: false, type: "video" },
      { id: "m2-4-2", title: "4.2 2~6的乘法口诀", duration: "45分钟", completed: false, type: "video" },
      { id: "m2-4-3", title: "单元练习", duration: "30分钟", completed: false, type: "exercise" },
    ],
  },
];

const mathGrade3: Chapter[] = [
  {
    id: 1, title: "第一单元 时、分、秒", progress: 0,
    lessons: [
      { id: "m3-1-1", title: "1.1 秒的认识", duration: "40分钟", completed: false, type: "video" },
      { id: "m3-1-2", title: "1.2 时间的计算", duration: "40分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二单元 万以内的加法和减法（一）", progress: 0,
    lessons: [
      { id: "m3-2-1", title: "2.1 两位数加两位数", duration: "40分钟", completed: false, type: "video" },
      { id: "m3-2-2", title: "2.2 两位数减两位数", duration: "40分钟", completed: false, type: "video" },
      { id: "m3-2-3", title: "2.3 几百几十加减几百几十", duration: "40分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第三单元 测量", progress: 0,
    lessons: [
      { id: "m3-3-1", title: "3.1 毫米、分米的认识", duration: "40分钟", completed: false, type: "video" },
      { id: "m3-3-2", title: "3.2 千米的认识", duration: "40分钟", completed: false, type: "video" },
      { id: "m3-3-3", title: "3.3 吨的认识", duration: "35分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 4, title: "第四单元 万以内的加法和减法（二）", progress: 0,
    lessons: [
      { id: "m3-4-1", title: "4.1 加法", duration: "45分钟", completed: false, type: "video" },
      { id: "m3-4-2", title: "4.2 减法", duration: "45分钟", completed: false, type: "video" },
      { id: "m3-4-3", title: "单元练习", duration: "30分钟", completed: false, type: "exercise" },
    ],
  },
  {
    id: 5, title: "第五单元 倍的认识", progress: 0,
    lessons: [
      { id: "m3-5-1", title: "5.1 倍的认识", duration: "40分钟", completed: false, type: "video" },
      { id: "m3-5-2", title: "5.2 求一个数是另一个数的几倍", duration: "40分钟", completed: false, type: "video" },
    ],
  },
];

const mathGrade4: Chapter[] = [
  {
    id: 1, title: "第一单元 大数的认识", progress: 0,
    lessons: [
      { id: "m4-1-1", title: "1.1 亿以内数的认识", duration: "45分钟", completed: false, type: "video" },
      { id: "m4-1-2", title: "1.2 亿以内数的读法和写法", duration: "45分钟", completed: false, type: "video" },
      { id: "m4-1-3", title: "1.3 亿以上数的认识", duration: "40分钟", completed: false, type: "video" },
      { id: "m4-1-4", title: "1.4 计算工具的认识", duration: "35分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二单元 公顷和平方千米", progress: 0,
    lessons: [
      { id: "m4-2-1", title: "2.1 公顷的认识", duration: "40分钟", completed: false, type: "video" },
      { id: "m4-2-2", title: "2.2 平方千米的认识", duration: "40分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第三单元 角的度量", progress: 0,
    lessons: [
      { id: "m4-3-1", title: "3.1 线段、直线、射线", duration: "40分钟", completed: false, type: "video" },
      { id: "m4-3-2", title: "3.2 角的度量", duration: "45分钟", completed: false, type: "video" },
      { id: "m4-3-3", title: "3.3 角的分类", duration: "35分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 4, title: "第四单元 三位数乘两位数", progress: 0,
    lessons: [
      { id: "m4-4-1", title: "4.1 口算乘法", duration: "35分钟", completed: false, type: "video" },
      { id: "m4-4-2", title: "4.2 笔算乘法", duration: "45分钟", completed: false, type: "video" },
      { id: "m4-4-3", title: "单元练习", duration: "30分钟", completed: false, type: "exercise" },
    ],
  },
];

const mathGrade5: Chapter[] = [
  {
    id: 1, title: "第一单元 小数乘法", progress: 40,
    lessons: [
      { id: "m5-1-1", title: "1.1 小数乘整数", duration: "45分钟", completed: true, type: "video" },
      { id: "m5-1-2", title: "1.2 小数乘小数", duration: "45分钟", completed: true, type: "video" },
      { id: "m5-1-3", title: "1.3 积的近似数", duration: "40分钟", completed: false, type: "video" },
      { id: "m5-1-4", title: "1.4 整数乘法运算定律推广到小数", duration: "40分钟", completed: false, type: "video" },
      { id: "m5-1-5", title: "单元练习", duration: "30分钟", completed: false, type: "exercise" },
    ],
  },
  {
    id: 2, title: "第二单元 位置", progress: 0,
    lessons: [
      { id: "m5-2-1", title: "2.1 用数对确定位置", duration: "45分钟", completed: false, type: "video" },
      { id: "m5-2-2", title: "2.2 在方格纸上用数对确定位置", duration: "40分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第三单元 小数除法", progress: 0,
    lessons: [
      { id: "m5-3-1", title: "3.1 小数除以整数", duration: "45分钟", completed: false, type: "video" },
      { id: "m5-3-2", title: "3.2 一个数除以小数", duration: "45分钟", completed: false, type: "video" },
      { id: "m5-3-3", title: "3.3 商的近似数", duration: "40分钟", completed: false, type: "video" },
      { id: "m5-3-4", title: "3.4 循环小数", duration: "45分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 4, title: "第四单元 可能性", progress: 0,
    lessons: [
      { id: "m5-4-1", title: "4.1 可能性", duration: "40分钟", completed: false, type: "video" },
      { id: "m5-4-2", title: "4.2 掷一掷", duration: "35分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 5, title: "第五单元 简易方程", progress: 0,
    lessons: [
      { id: "m5-5-1", title: "5.1 用字母表示数", duration: "45分钟", completed: false, type: "video" },
      { id: "m5-5-2", title: "5.2 方程的意义", duration: "40分钟", completed: false, type: "video" },
      { id: "m5-5-3", title: "5.3 解方程", duration: "50分钟", completed: false, type: "video" },
      { id: "m5-5-4", title: "5.4 实际问题与方程", duration: "45分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 6, title: "第六单元 多边形的面积", progress: 0,
    lessons: [
      { id: "m5-6-1", title: "6.1 平行四边形的面积", duration: "45分钟", completed: false, type: "video" },
      { id: "m5-6-2", title: "6.2 三角形的面积", duration: "45分钟", completed: false, type: "video" },
      { id: "m5-6-3", title: "6.3 梯形的面积", duration: "45分钟", completed: false, type: "video" },
    ],
  },
];

const mathGrade6: Chapter[] = [
  {
    id: 1, title: "第一单元 分数乘法", progress: 0,
    lessons: [
      { id: "m6-1-1", title: "1.1 分数乘整数", duration: "45分钟", completed: false, type: "video" },
      { id: "m6-1-2", title: "1.2 分数乘分数", duration: "45分钟", completed: false, type: "video" },
      { id: "m6-1-3", title: "1.3 分数混合运算", duration: "40分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二单元 位置与方向（二）", progress: 0,
    lessons: [
      { id: "m6-2-1", title: "2.1 确定物体位置", duration: "45分钟", completed: false, type: "video" },
      { id: "m6-2-2", title: "2.2 描述简单的路线图", duration: "40分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第三单元 分数除法", progress: 0,
    lessons: [
      { id: "m6-3-1", title: "3.1 倒数的认识", duration: "35分钟", completed: false, type: "video" },
      { id: "m6-3-2", title: "3.2 分数除以整数", duration: "45分钟", completed: false, type: "video" },
      { id: "m6-3-3", title: "3.3 一个数除以分数", duration: "45分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 4, title: "第四单元 比", progress: 0,
    lessons: [
      { id: "m6-4-1", title: "4.1 比的意义", duration: "40分钟", completed: false, type: "video" },
      { id: "m6-4-2", title: "4.2 比的基本性质", duration: "40分钟", completed: false, type: "video" },
      { id: "m6-4-3", title: "4.3 比的应用", duration: "45分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 5, title: "第五单元 圆", progress: 0,
    lessons: [
      { id: "m6-5-1", title: "5.1 圆的认识", duration: "45分钟", completed: false, type: "video" },
      { id: "m6-5-2", title: "5.2 圆的周长", duration: "45分钟", completed: false, type: "video" },
      { id: "m6-5-3", title: "5.3 圆的面积", duration: "45分钟", completed: false, type: "video" },
    ],
  },
];

// Chinese (语文) for elementary
const chineseGrade5: Chapter[] = [
  {
    id: 1, title: "第一单元 万物有灵", progress: 33,
    lessons: [
      { id: "c5-1-1", title: "1 白鹭", duration: "45分钟", completed: true, type: "video" },
      { id: "c5-1-2", title: "2 落花生", duration: "40分钟", completed: true, type: "video" },
      { id: "c5-1-3", title: "3 桂花雨", duration: "45分钟", completed: false, type: "video" },
      { id: "c5-1-4", title: "4* 珍珠鸟", duration: "35分钟", completed: false, type: "video" },
      { id: "c5-1-5", title: "习作：我的心爱之物", duration: "40分钟", completed: false, type: "exercise" },
    ],
  },
  {
    id: 2, title: "第二单元 阅读策略", progress: 0,
    lessons: [
      { id: "c5-2-1", title: "5 搭石", duration: "45分钟", completed: false, type: "video" },
      { id: "c5-2-2", title: "6 将相和", duration: "50分钟", completed: false, type: "video" },
      { id: "c5-2-3", title: "7 什么比猎豹的速度更快", duration: "40分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第三单元 民间故事", progress: 0,
    lessons: [
      { id: "c5-3-1", title: "9 猎人海力布", duration: "45分钟", completed: false, type: "video" },
      { id: "c5-3-2", title: "10 牛郎织女（一）", duration: "45分钟", completed: false, type: "video" },
      { id: "c5-3-3", title: "11* 牛郎织女（二）", duration: "40分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 4, title: "第四单元 家国情怀", progress: 0,
    lessons: [
      { id: "c5-4-1", title: "12 古诗三首", duration: "50分钟", completed: false, type: "video" },
      { id: "c5-4-2", title: "13 少年中国说（节选）", duration: "45分钟", completed: false, type: "video" },
      { id: "c5-4-3", title: "14 圆明园的毁灭", duration: "45分钟", completed: false, type: "video" },
    ],
  },
];

// English for elementary
const englishGrade5: Chapter[] = [
  {
    id: 1, title: "Unit 1 What's he like?", progress: 40,
    lessons: [
      { id: "e5-1-1", title: "Part A Let's talk", duration: "40分钟", completed: true, type: "video" },
      { id: "e5-1-2", title: "Part A Let's learn", duration: "35分钟", completed: true, type: "video" },
      { id: "e5-1-3", title: "Part B Let's talk", duration: "40分钟", completed: false, type: "video" },
      { id: "e5-1-4", title: "Part B Read and write", duration: "45分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "Unit 2 My week", progress: 0,
    lessons: [
      { id: "e5-2-1", title: "Part A Let's talk", duration: "40分钟", completed: false, type: "video" },
      { id: "e5-2-2", title: "Part A Let's learn", duration: "35分钟", completed: false, type: "video" },
      { id: "e5-2-3", title: "Part B Let's talk", duration: "40分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "Unit 3 What would you like?", progress: 0,
    lessons: [
      { id: "e5-3-1", title: "Part A Let's talk", duration: "40分钟", completed: false, type: "video" },
      { id: "e5-3-2", title: "Part A Let's learn", duration: "35分钟", completed: false, type: "video" },
      { id: "e5-3-3", title: "Part B Read and write", duration: "45分钟", completed: false, type: "video" },
    ],
  },
];

// =====================
// 初中 (Middle School)
// =====================

const mathGrade7: Chapter[] = [
  {
    id: 1, title: "第一章 有理数", progress: 0,
    lessons: [
      { id: "m7-1-1", title: "1.1 正数和负数", duration: "45分钟", completed: false, type: "video" },
      { id: "m7-1-2", title: "1.2 有理数", duration: "45分钟", completed: false, type: "video" },
      { id: "m7-1-3", title: "1.3 有理数的加减法", duration: "50分钟", completed: false, type: "video" },
      { id: "m7-1-4", title: "1.4 有理数的乘除法", duration: "50分钟", completed: false, type: "video" },
      { id: "m7-1-5", title: "1.5 有理数的乘方", duration: "45分钟", completed: false, type: "video" },
      { id: "m7-1-6", title: "单元测试", duration: "40分钟", completed: false, type: "exercise" },
    ],
  },
  {
    id: 2, title: "第二章 整式的加减", progress: 0,
    lessons: [
      { id: "m7-2-1", title: "2.1 整式", duration: "45分钟", completed: false, type: "video" },
      { id: "m7-2-2", title: "2.2 整式的加减", duration: "50分钟", completed: false, type: "video" },
      { id: "m7-2-3", title: "单元测试", duration: "35分钟", completed: false, type: "exercise" },
    ],
  },
  {
    id: 3, title: "第三章 一元一次方程", progress: 0,
    lessons: [
      { id: "m7-3-1", title: "3.1 从算式到方程", duration: "45分钟", completed: false, type: "video" },
      { id: "m7-3-2", title: "3.2 解一元一次方程（一）", duration: "50分钟", completed: false, type: "video" },
      { id: "m7-3-3", title: "3.3 解一元一次方程（二）", duration: "50分钟", completed: false, type: "video" },
      { id: "m7-3-4", title: "3.4 实际问题与一元一次方程", duration: "50分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 4, title: "第四章 几何图形初步", progress: 0,
    lessons: [
      { id: "m7-4-1", title: "4.1 几何图形", duration: "40分钟", completed: false, type: "video" },
      { id: "m7-4-2", title: "4.2 直线、射线、线段", duration: "45分钟", completed: false, type: "video" },
      { id: "m7-4-3", title: "4.3 角", duration: "45分钟", completed: false, type: "video" },
    ],
  },
];

const mathGrade8: Chapter[] = [
  {
    id: 1, title: "第十一章 三角形", progress: 0,
    lessons: [
      { id: "m8-1-1", title: "11.1 与三角形有关的线段", duration: "50分钟", completed: false, type: "video" },
      { id: "m8-1-2", title: "11.2 与三角形有关的角", duration: "50分钟", completed: false, type: "video" },
      { id: "m8-1-3", title: "11.3 多边形及其内角和", duration: "50分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第十二章 全等三角形", progress: 0,
    lessons: [
      { id: "m8-2-1", title: "12.1 全等三角形", duration: "45分钟", completed: false, type: "video" },
      { id: "m8-2-2", title: "12.2 三角形全等的判定", duration: "55分钟", completed: false, type: "video" },
      { id: "m8-2-3", title: "12.3 角的平分线的性质", duration: "45分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第十三章 轴对称", progress: 0,
    lessons: [
      { id: "m8-3-1", title: "13.1 轴对称", duration: "45分钟", completed: false, type: "video" },
      { id: "m8-3-2", title: "13.2 画轴对称图形", duration: "40分钟", completed: false, type: "video" },
      { id: "m8-3-3", title: "13.3 等腰三角形", duration: "50分钟", completed: false, type: "video" },
    ],
  },
];

const mathGrade9: Chapter[] = [
  {
    id: 1, title: "第二十一章 一元二次方程", progress: 0,
    lessons: [
      { id: "m9-1-1", title: "21.1 一元二次方程", duration: "50分钟", completed: false, type: "video" },
      { id: "m9-1-2", title: "21.2 解一元二次方程", duration: "55分钟", completed: false, type: "video" },
      { id: "m9-1-3", title: "21.3 实际问题与一元二次方程", duration: "50分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二十二章 二次函数", progress: 0,
    lessons: [
      { id: "m9-2-1", title: "22.1 二次函数的图象和性质", duration: "55分钟", completed: false, type: "video" },
      { id: "m9-2-2", title: "22.2 二次函数与一元二次方程", duration: "50分钟", completed: false, type: "video" },
      { id: "m9-2-3", title: "22.3 实际问题与二次函数", duration: "50分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第二十三章 旋转", progress: 0,
    lessons: [
      { id: "m9-3-1", title: "23.1 图形的旋转", duration: "45分钟", completed: false, type: "video" },
      { id: "m9-3-2", title: "23.2 中心对称", duration: "45分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 4, title: "第二十四章 圆", progress: 0,
    lessons: [
      { id: "m9-4-1", title: "24.1 圆的有关性质", duration: "50分钟", completed: false, type: "video" },
      { id: "m9-4-2", title: "24.2 点和圆、直线和圆的位置关系", duration: "55分钟", completed: false, type: "video" },
      { id: "m9-4-3", title: "24.3 正多边形和圆", duration: "45分钟", completed: false, type: "video" },
      { id: "m9-4-4", title: "24.4 弧长和扇形面积", duration: "45分钟", completed: false, type: "video" },
    ],
  },
];

// Middle school Chinese
const chineseGrade7: Chapter[] = [
  {
    id: 1, title: "第一单元 四季美景", progress: 0,
    lessons: [
      { id: "c7-1-1", title: "1 春", duration: "50分钟", completed: false, type: "video" },
      { id: "c7-1-2", title: "2 济南的冬天", duration: "50分钟", completed: false, type: "video" },
      { id: "c7-1-3", title: "3* 雨的四季", duration: "45分钟", completed: false, type: "video" },
      { id: "c7-1-4", title: "写作：热爱生活 热爱写作", duration: "45分钟", completed: false, type: "exercise" },
    ],
  },
  {
    id: 2, title: "第二单元 至爱亲情", progress: 0,
    lessons: [
      { id: "c7-2-1", title: "4 秋天的怀念", duration: "50分钟", completed: false, type: "video" },
      { id: "c7-2-2", title: "5 散步", duration: "45分钟", completed: false, type: "video" },
      { id: "c7-2-3", title: "6 散文诗二首", duration: "50分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第三单元 学习生活", progress: 0,
    lessons: [
      { id: "c7-3-1", title: "9 从百草园到三味书屋", duration: "55分钟", completed: false, type: "video" },
      { id: "c7-3-2", title: "10* 再塑生命的人", duration: "45分钟", completed: false, type: "video" },
      { id: "c7-3-3", title: "11 《论语》十二章", duration: "55分钟", completed: false, type: "video" },
    ],
  },
];

// Middle school English
const englishGrade7: Chapter[] = [
  {
    id: 1, title: "Unit 1 My name's Gina", progress: 0,
    lessons: [
      { id: "e7-1-1", title: "Section A Grammar Focus", duration: "45分钟", completed: false, type: "video" },
      { id: "e7-1-2", title: "Section B Reading", duration: "45分钟", completed: false, type: "video" },
      { id: "e7-1-3", title: "Self Check", duration: "30分钟", completed: false, type: "exercise" },
    ],
  },
  {
    id: 2, title: "Unit 2 This is my sister", progress: 0,
    lessons: [
      { id: "e7-2-1", title: "Section A Grammar Focus", duration: "45分钟", completed: false, type: "video" },
      { id: "e7-2-2", title: "Section B Reading", duration: "45分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "Unit 3 Is this your pencil?", progress: 0,
    lessons: [
      { id: "e7-3-1", title: "Section A Grammar Focus", duration: "45分钟", completed: false, type: "video" },
      { id: "e7-3-2", title: "Section B Reading", duration: "45分钟", completed: false, type: "video" },
    ],
  },
];

// Middle school Physics (初中物理)
const physicsGrade8: Chapter[] = [
  {
    id: 1, title: "第一章 机械运动", progress: 0,
    lessons: [
      { id: "p8-1-1", title: "1.1 长度和时间的测量", duration: "50分钟", completed: false, type: "video" },
      { id: "p8-1-2", title: "1.2 运动的描述", duration: "45分钟", completed: false, type: "video" },
      { id: "p8-1-3", title: "1.3 运动的快慢", duration: "50分钟", completed: false, type: "video" },
      { id: "p8-1-4", title: "1.4 测量平均速度", duration: "45分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二章 声现象", progress: 0,
    lessons: [
      { id: "p8-2-1", title: "2.1 声音的产生与传播", duration: "50分钟", completed: false, type: "video" },
      { id: "p8-2-2", title: "2.2 声音的特性", duration: "45分钟", completed: false, type: "video" },
      { id: "p8-2-3", title: "2.3 声的利用", duration: "40分钟", completed: false, type: "video" },
      { id: "p8-2-4", title: "2.4 噪声的危害和控制", duration: "40分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第三章 物态变化", progress: 0,
    lessons: [
      { id: "p8-3-1", title: "3.1 温度", duration: "45分钟", completed: false, type: "video" },
      { id: "p8-3-2", title: "3.2 熔化和凝固", duration: "50分钟", completed: false, type: "video" },
      { id: "p8-3-3", title: "3.3 汽化和液化", duration: "50分钟", completed: false, type: "video" },
      { id: "p8-3-4", title: "3.4 升华和凝华", duration: "40分钟", completed: false, type: "video" },
    ],
  },
];

// Middle school Chemistry (初中化学 - 九年级)
const chemistryGrade9: Chapter[] = [
  {
    id: 1, title: "第一单元 走进化学世界", progress: 0,
    lessons: [
      { id: "ch9-1-1", title: "课题1 物质的变化和性质", duration: "50分钟", completed: false, type: "video" },
      { id: "ch9-1-2", title: "课题2 化学是一门以实验为基础的科学", duration: "50分钟", completed: false, type: "video" },
      { id: "ch9-1-3", title: "课题3 走进化学实验室", duration: "55分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二单元 我们周围的空气", progress: 0,
    lessons: [
      { id: "ch9-2-1", title: "课题1 空气", duration: "50分钟", completed: false, type: "video" },
      { id: "ch9-2-2", title: "课题2 氧气", duration: "50分钟", completed: false, type: "video" },
      { id: "ch9-2-3", title: "课题3 制取氧气", duration: "55分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第三单元 物质构成的奥秘", progress: 0,
    lessons: [
      { id: "ch9-3-1", title: "课题1 分子和原子", duration: "55分钟", completed: false, type: "video" },
      { id: "ch9-3-2", title: "课题2 原子的结构", duration: "55分钟", completed: false, type: "video" },
      { id: "ch9-3-3", title: "课题3 元素", duration: "50分钟", completed: false, type: "video" },
    ],
  },
];

// =====================
// 高中 (High School)
// =====================

const mathGrade10: Chapter[] = [
  {
    id: 1, title: "第一章 集合与常用逻辑用语", progress: 0,
    lessons: [
      { id: "m10-1-1", title: "1.1 集合的概念", duration: "50分钟", completed: false, type: "video" },
      { id: "m10-1-2", title: "1.2 集合间的基本关系", duration: "50分钟", completed: false, type: "video" },
      { id: "m10-1-3", title: "1.3 集合的基本运算", duration: "55分钟", completed: false, type: "video" },
      { id: "m10-1-4", title: "1.4 充分条件与必要条件", duration: "50分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二章 一元二次函数、方程和不等式", progress: 0,
    lessons: [
      { id: "m10-2-1", title: "2.1 等式性质与不等式性质", duration: "50分钟", completed: false, type: "video" },
      { id: "m10-2-2", title: "2.2 基本不等式", duration: "55分钟", completed: false, type: "video" },
      { id: "m10-2-3", title: "2.3 二次函数与一元二次方程、不等式", duration: "60分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第三章 函数的概念与性质", progress: 0,
    lessons: [
      { id: "m10-3-1", title: "3.1 函数的概念及其表示", duration: "55分钟", completed: false, type: "video" },
      { id: "m10-3-2", title: "3.2 函数的基本性质", duration: "60分钟", completed: false, type: "video" },
      { id: "m10-3-3", title: "3.3 幂函数", duration: "50分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 4, title: "第四章 指数函数与对数函数", progress: 0,
    lessons: [
      { id: "m10-4-1", title: "4.1 指数", duration: "50分钟", completed: false, type: "video" },
      { id: "m10-4-2", title: "4.2 指数函数", duration: "55分钟", completed: false, type: "video" },
      { id: "m10-4-3", title: "4.3 对数", duration: "55分钟", completed: false, type: "video" },
      { id: "m10-4-4", title: "4.4 对数函数", duration: "55分钟", completed: false, type: "video" },
    ],
  },
];

const mathGrade11: Chapter[] = [
  {
    id: 1, title: "第一章 空间向量与立体几何", progress: 0,
    lessons: [
      { id: "m11-1-1", title: "1.1 空间向量及其运算", duration: "55分钟", completed: false, type: "video" },
      { id: "m11-1-2", title: "1.2 空间向量基本定理", duration: "55分钟", completed: false, type: "video" },
      { id: "m11-1-3", title: "1.3 空间向量的坐标表示", duration: "55分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二章 平面解析几何", progress: 0,
    lessons: [
      { id: "m11-2-1", title: "2.1 直线的倾斜角与斜率", duration: "50分钟", completed: false, type: "video" },
      { id: "m11-2-2", title: "2.2 直线的方程", duration: "55分钟", completed: false, type: "video" },
      { id: "m11-2-3", title: "2.3 圆的方程", duration: "55分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第三章 圆锥曲线的方程", progress: 0,
    lessons: [
      { id: "m11-3-1", title: "3.1 椭圆", duration: "60分钟", completed: false, type: "video" },
      { id: "m11-3-2", title: "3.2 双曲线", duration: "55分钟", completed: false, type: "video" },
      { id: "m11-3-3", title: "3.3 抛物线", duration: "55分钟", completed: false, type: "video" },
    ],
  },
];

const mathGrade12: Chapter[] = [
  {
    id: 1, title: "第一章 导数及其应用", progress: 0,
    lessons: [
      { id: "m12-1-1", title: "1.1 导数的概念及其意义", duration: "60分钟", completed: false, type: "video" },
      { id: "m12-1-2", title: "1.2 导数的计算", duration: "55分钟", completed: false, type: "video" },
      { id: "m12-1-3", title: "1.3 导数在研究函数中的应用", duration: "60分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二章 统计与概率", progress: 0,
    lessons: [
      { id: "m12-2-1", title: "2.1 条件概率与全概率公式", duration: "55分钟", completed: false, type: "video" },
      { id: "m12-2-2", title: "2.2 随机变量及其分布", duration: "60分钟", completed: false, type: "video" },
      { id: "m12-2-3", title: "2.3 正态分布", duration: "55分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "高考专题复习", progress: 0,
    lessons: [
      { id: "m12-3-1", title: "专题一 函数与导数", duration: "60分钟", completed: false, type: "video" },
      { id: "m12-3-2", title: "专题二 三角函数与解三角形", duration: "55分钟", completed: false, type: "video" },
      { id: "m12-3-3", title: "专题三 数列", duration: "55分钟", completed: false, type: "video" },
      { id: "m12-3-4", title: "专题四 立体几何", duration: "55分钟", completed: false, type: "video" },
      { id: "m12-3-5", title: "专题五 解析几何", duration: "60分钟", completed: false, type: "video" },
      { id: "m12-3-6", title: "专题六 概率统计", duration: "55分钟", completed: false, type: "video" },
    ],
  },
];

// High school Chinese
const chineseGrade10: Chapter[] = [
  {
    id: 1, title: "第一单元 青春的价值", progress: 0,
    lessons: [
      { id: "c10-1-1", title: "1 沁园春·长沙", duration: "55分钟", completed: false, type: "video" },
      { id: "c10-1-2", title: "2 立在地球边上放号 / 红烛", duration: "50分钟", completed: false, type: "video" },
      { id: "c10-1-3", title: "3 百合花 / 哦，香雪", duration: "55分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二单元 劳动光荣", progress: 0,
    lessons: [
      { id: "c10-2-1", title: "4 喜看稻菽千重浪", duration: "50分钟", completed: false, type: "video" },
      { id: "c10-2-2", title: "5 以工匠精神雕琢时代品质", duration: "45分钟", completed: false, type: "video" },
      { id: "c10-2-3", title: "6* 芣苢 / 插秧歌", duration: "45分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第三单元 古诗词鉴赏", progress: 0,
    lessons: [
      { id: "c10-3-1", title: "7 短歌行 / 归园田居", duration: "55分钟", completed: false, type: "video" },
      { id: "c10-3-2", title: "8 梦游天姥吟留别 / 登高", duration: "55分钟", completed: false, type: "video" },
      { id: "c10-3-3", title: "9 琵琶行（并序）", duration: "60分钟", completed: false, type: "video" },
    ],
  },
];

// High school Physics
const physicsGrade10: Chapter[] = [
  {
    id: 1, title: "第一章 运动的描述", progress: 0,
    lessons: [
      { id: "ph10-1-1", title: "1.1 质点 参考系", duration: "50分钟", completed: false, type: "video" },
      { id: "ph10-1-2", title: "1.2 时间 位移", duration: "50分钟", completed: false, type: "video" },
      { id: "ph10-1-3", title: "1.3 位置变化快慢的描述——速度", duration: "55分钟", completed: false, type: "video" },
      { id: "ph10-1-4", title: "1.4 速度变化快慢的描述——加速度", duration: "55分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二章 匀变速直线运动的研究", progress: 0,
    lessons: [
      { id: "ph10-2-1", title: "2.1 实验：探究小车速度随时间变化的规律", duration: "55分钟", completed: false, type: "video" },
      { id: "ph10-2-2", title: "2.2 匀变速直线运动的速度与时间的关系", duration: "55分钟", completed: false, type: "video" },
      { id: "ph10-2-3", title: "2.3 匀变速直线运动的位移与时间的关系", duration: "55分钟", completed: false, type: "video" },
      { id: "ph10-2-4", title: "2.4 自由落体运动", duration: "50分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第三章 相互作用——力", progress: 0,
    lessons: [
      { id: "ph10-3-1", title: "3.1 重力与弹力", duration: "50分钟", completed: false, type: "video" },
      { id: "ph10-3-2", title: "3.2 摩擦力", duration: "50分钟", completed: false, type: "video" },
      { id: "ph10-3-3", title: "3.3 牛顿第三定律", duration: "50分钟", completed: false, type: "video" },
      { id: "ph10-3-4", title: "3.4 力的合成和分解", duration: "55分钟", completed: false, type: "video" },
    ],
  },
];

// High school Chemistry
const chemistryGrade10: Chapter[] = [
  {
    id: 1, title: "第一章 物质及其变化", progress: 0,
    lessons: [
      { id: "chem10-1-1", title: "1.1 物质的分类及转化", duration: "55分钟", completed: false, type: "video" },
      { id: "chem10-1-2", title: "1.2 离子反应", duration: "55分钟", completed: false, type: "video" },
      { id: "chem10-1-3", title: "1.3 氧化还原反应", duration: "60分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第二章 海水中的重要元素——钠和氯", progress: 0,
    lessons: [
      { id: "chem10-2-1", title: "2.1 钠及其化合物", duration: "55分钟", completed: false, type: "video" },
      { id: "chem10-2-2", title: "2.2 氯及其化合物", duration: "55分钟", completed: false, type: "video" },
      { id: "chem10-2-3", title: "2.3 物质的量", duration: "60分钟", completed: false, type: "video" },
    ],
  },
];

// High school Biology
const biologyGrade10: Chapter[] = [
  {
    id: 1, title: "第1章 走近细胞", progress: 0,
    lessons: [
      { id: "bio10-1-1", title: "1.1 细胞是生命活动的基本单位", duration: "50分钟", completed: false, type: "video" },
      { id: "bio10-1-2", title: "1.2 细胞的多样性和统一性", duration: "50分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 2, title: "第2章 组成细胞的分子", progress: 0,
    lessons: [
      { id: "bio10-2-1", title: "2.1 细胞中的元素和化合物", duration: "50分钟", completed: false, type: "video" },
      { id: "bio10-2-2", title: "2.2 生命活动的主要承担者——蛋白质", duration: "55分钟", completed: false, type: "video" },
      { id: "bio10-2-3", title: "2.3 遗传信息的携带者——核酸", duration: "50分钟", completed: false, type: "video" },
      { id: "bio10-2-4", title: "2.4 细胞中的糖类和脂质", duration: "45分钟", completed: false, type: "video" },
    ],
  },
  {
    id: 3, title: "第3章 细胞的基本结构", progress: 0,
    lessons: [
      { id: "bio10-3-1", title: "3.1 细胞膜的结构和功能", duration: "55分钟", completed: false, type: "video" },
      { id: "bio10-3-2", title: "3.2 细胞器之间的分工合作", duration: "55分钟", completed: false, type: "video" },
      { id: "bio10-3-3", title: "3.3 细胞核的结构和功能", duration: "50分钟", completed: false, type: "video" },
    ],
  },
];

// =====================
// Subject definitions by school level
// =====================

function makeSubjects(subjectMap: Record<string, { label: string; icon: string; chapters: Chapter[] }>): SubjectData[] {
  return Object.entries(subjectMap).map(([id, data]) => ({
    id,
    label: data.label,
    icon: data.icon,
    chapters: data.chapters,
  }));
}

// Placeholder chapters for grades without full data
const placeholderChapters = (subject: string, count: number): Chapter[] =>
  Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    title: `第${i + 1}单元`,
    progress: 0,
    lessons: [
      { id: `ph-${subject}-${i + 1}-1`, title: `${i + 1}.1 知识点一`, duration: "45分钟", completed: false, type: "video" as const },
      { id: `ph-${subject}-${i + 1}-2`, title: `${i + 1}.2 知识点二`, duration: "45分钟", completed: false, type: "video" as const },
      { id: `ph-${subject}-${i + 1}-3`, title: `单元练习`, duration: "30分钟", completed: false, type: "exercise" as const },
    ],
  }));

// =====================
// Full curriculum structure
// =====================

export const curriculum: SchoolLevel[] = [
  {
    id: "elementary",
    label: "小学",
    grades: [
      {
        id: "grade1", label: "一年级", shortLabel: "一年级",
        subjects: makeSubjects({
          math: { label: "数学", icon: "📐", chapters: mathGrade1 },
          chinese: { label: "语文", icon: "📖", chapters: placeholderChapters("c1", 4) },
        }),
      },
      {
        id: "grade2", label: "二年级", shortLabel: "二年级",
        subjects: makeSubjects({
          math: { label: "数学", icon: "📐", chapters: mathGrade2 },
          chinese: { label: "语文", icon: "📖", chapters: placeholderChapters("c2", 4) },
        }),
      },
      {
        id: "grade3", label: "三年级", shortLabel: "三年级",
        subjects: makeSubjects({
          math: { label: "数学", icon: "📐", chapters: mathGrade3 },
          chinese: { label: "语文", icon: "📖", chapters: placeholderChapters("c3", 5) },
          english: { label: "英语", icon: "🔤", chapters: placeholderChapters("e3", 4) },
        }),
      },
      {
        id: "grade4", label: "四年级", shortLabel: "四年级",
        subjects: makeSubjects({
          math: { label: "数学", icon: "📐", chapters: mathGrade4 },
          chinese: { label: "语文", icon: "📖", chapters: placeholderChapters("c4", 5) },
          english: { label: "英语", icon: "🔤", chapters: placeholderChapters("e4", 4) },
        }),
      },
      {
        id: "grade5", label: "五年级", shortLabel: "五年级",
        subjects: makeSubjects({
          math: { label: "数学", icon: "📐", chapters: mathGrade5 },
          chinese: { label: "语文", icon: "📖", chapters: chineseGrade5 },
          english: { label: "英语", icon: "🔤", chapters: englishGrade5 },
        }),
      },
      {
        id: "grade6", label: "六年级", shortLabel: "六年级",
        subjects: makeSubjects({
          math: { label: "数学", icon: "📐", chapters: mathGrade6 },
          chinese: { label: "语文", icon: "📖", chapters: placeholderChapters("c6", 5) },
          english: { label: "英语", icon: "🔤", chapters: placeholderChapters("e6", 4) },
        }),
      },
    ],
  },
  {
    id: "middle",
    label: "初中",
    grades: [
      {
        id: "grade7", label: "七年级", shortLabel: "七年级",
        subjects: makeSubjects({
          math: { label: "数学", icon: "📐", chapters: mathGrade7 },
          chinese: { label: "语文", icon: "📖", chapters: chineseGrade7 },
          english: { label: "英语", icon: "🔤", chapters: englishGrade7 },
        }),
      },
      {
        id: "grade8", label: "八年级", shortLabel: "八年级",
        subjects: makeSubjects({
          math: { label: "数学", icon: "📐", chapters: mathGrade8 },
          chinese: { label: "语文", icon: "📖", chapters: placeholderChapters("c8", 4) },
          english: { label: "英语", icon: "🔤", chapters: placeholderChapters("e8", 5) },
          physics: { label: "物理", icon: "⚡", chapters: physicsGrade8 },
        }),
      },
      {
        id: "grade9", label: "九年级", shortLabel: "九年级",
        subjects: makeSubjects({
          math: { label: "数学", icon: "📐", chapters: mathGrade9 },
          chinese: { label: "语文", icon: "📖", chapters: placeholderChapters("c9", 4) },
          english: { label: "英语", icon: "🔤", chapters: placeholderChapters("e9", 5) },
          physics: { label: "物理", icon: "⚡", chapters: placeholderChapters("p9", 4) },
          chemistry: { label: "化学", icon: "🧪", chapters: chemistryGrade9 },
        }),
      },
    ],
  },
  {
    id: "high",
    label: "高中",
    grades: [
      {
        id: "grade10", label: "高一", shortLabel: "高一",
        subjects: makeSubjects({
          math: { label: "数学", icon: "📐", chapters: mathGrade10 },
          chinese: { label: "语文", icon: "📖", chapters: chineseGrade10 },
          english: { label: "英语", icon: "🔤", chapters: placeholderChapters("e10", 5) },
          physics: { label: "物理", icon: "⚡", chapters: physicsGrade10 },
          chemistry: { label: "化学", icon: "🧪", chapters: chemistryGrade10 },
          biology: { label: "生物", icon: "🧬", chapters: biologyGrade10 },
        }),
      },
      {
        id: "grade11", label: "高二", shortLabel: "高二",
        subjects: makeSubjects({
          math: { label: "数学", icon: "📐", chapters: mathGrade11 },
          chinese: { label: "语文", icon: "📖", chapters: placeholderChapters("c11", 4) },
          english: { label: "英语", icon: "🔤", chapters: placeholderChapters("e11", 5) },
          physics: { label: "物理", icon: "⚡", chapters: placeholderChapters("p11", 4) },
          chemistry: { label: "化学", icon: "🧪", chapters: placeholderChapters("ch11", 4) },
          biology: { label: "生物", icon: "🧬", chapters: placeholderChapters("b11", 4) },
          history: { label: "历史", icon: "📜", chapters: placeholderChapters("h11", 4) },
          geography: { label: "地理", icon: "🌍", chapters: placeholderChapters("g11", 4) },
          politics: { label: "政治", icon: "⚖️", chapters: placeholderChapters("po11", 4) },
        }),
      },
      {
        id: "grade12", label: "高三", shortLabel: "高三",
        subjects: makeSubjects({
          math: { label: "数学", icon: "📐", chapters: mathGrade12 },
          chinese: { label: "语文", icon: "📖", chapters: placeholderChapters("c12", 3) },
          english: { label: "英语", icon: "🔤", chapters: placeholderChapters("e12", 4) },
          physics: { label: "物理", icon: "⚡", chapters: placeholderChapters("p12", 4) },
          chemistry: { label: "化学", icon: "🧪", chapters: placeholderChapters("ch12", 4) },
          biology: { label: "生物", icon: "🧬", chapters: placeholderChapters("b12", 3) },
          history: { label: "历史", icon: "📜", chapters: placeholderChapters("h12", 3) },
          geography: { label: "地理", icon: "🌍", chapters: placeholderChapters("g12", 3) },
          politics: { label: "政治", icon: "⚖️", chapters: placeholderChapters("po12", 3) },
        }),
      },
    ],
  },
];

// Helper to find grade data
export function findGrade(gradeId: string): GradeData | undefined {
  for (const level of curriculum) {
    const grade = level.grades.find((g) => g.id === gradeId);
    if (grade) return grade;
  }
  return undefined;
}

// Helper to find school level for a grade
export function findSchoolLevel(gradeId: string): SchoolLevel | undefined {
  return curriculum.find((level) => level.grades.some((g) => g.id === gradeId));
}
