// Question bank organized by grade level and subject

export interface Question {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
  subject: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface ExamConfig {
  id: string;
  title: string;
  subject: string;
  grade: string;
  duration: number; // minutes
  questions: Question[];
}

// Elementary Math Questions
const elemMathQuestions: Question[] = [
  { id: 1, question: "计算: 3.5 × 2.4 = ?", options: ["7.4", "8.4", "8.0", "7.8"], correct: 1, explanation: "3.5 × 2.4 = 35 × 24 ÷ 100 = 840 ÷ 100 = 8.4", subject: "数学", difficulty: "easy" },
  { id: 2, question: "下列哪个选项是5的倍数？", options: ["12", "25", "33", "47"], correct: 1, explanation: "25 = 5 × 5，所以25是5的倍数。", subject: "数学", difficulty: "easy" },
  { id: 3, question: "一个三角形的底是8厘米，高是6厘米，它的面积是多少？", options: ["48平方厘米", "24平方厘米", "14平方厘米", "28平方厘米"], correct: 1, explanation: "三角形面积 = 底 × 高 ÷ 2 = 8 × 6 ÷ 2 = 24平方厘米", subject: "数学", difficulty: "easy" },
  { id: 4, question: "把3/4和5/6通分，它们的公分母是：", options: ["10", "12", "24", "8"], correct: 1, explanation: "4和6的最小公倍数是12，所以公分母是12。", subject: "数学", difficulty: "medium" },
  { id: 5, question: "一个正方体的棱长是5厘米，它的体积是：", options: ["25立方厘米", "125立方厘米", "150立方厘米", "100立方厘米"], correct: 1, explanation: "正方体体积 = 棱长³ = 5³ = 125立方厘米", subject: "数学", difficulty: "medium" },
  { id: 6, question: "下面哪个是方程？", options: ["3+5=8", "2x+1", "x-3=7", "6>5"], correct: 2, explanation: "方程是含有未知数的等式。x-3=7 含有未知数x且是等式。", subject: "数学", difficulty: "easy" },
  { id: 7, question: "0.75等于几分之几？", options: ["3/5", "3/4", "7/5", "7/10"], correct: 1, explanation: "0.75 = 75/100 = 3/4", subject: "数学", difficulty: "easy" },
  { id: 8, question: "一个平行四边形的底是10cm，高是7cm，面积是：", options: ["70平方厘米", "35平方厘米", "17平方厘米", "140平方厘米"], correct: 0, explanation: "平行四边形面积 = 底 × 高 = 10 × 7 = 70平方厘米", subject: "数学", difficulty: "easy" },
];

// Elementary Chinese Questions
const elemChineseQuestions: Question[] = [
  { id: 101, question: "\"春眠不觉晓\"出自哪首诗？", options: ["《静夜思》", "《春晓》", "《登鹳雀楼》", "《望庐山瀑布》"], correct: 1, explanation: "\"春眠不觉晓，处处闻啼鸟\"出自唐代诗人孟浩然的《春晓》。", subject: "语文", difficulty: "easy" },
  { id: 102, question: "\"落霞与孤鹜齐飞\"的下一句是什么？", options: ["长河落日圆", "秋水共长天一色", "大漠孤烟直", "白日依山尽"], correct: 1, explanation: "出自王勃的《滕王阁序》，描绘了傍晚时分的壮丽景色。", subject: "语文", difficulty: "medium" },
  { id: 103, question: "下列词语书写正确的是：", options: ["迫不急待", "迫不及待", "迫不急代", "泊不及待"], correct: 1, explanation: "\"迫不及待\"意为急迫得不能等待，\"及\"是来得及的意思。", subject: "语文", difficulty: "easy" },
  { id: 104, question: "\"但愿人长久，千里共婵娟\"中的\"婵娟\"指的是：", options: ["美女", "月亮", "太阳", "星星"], correct: 1, explanation: "\"婵娟\"在这里指月亮。出自苏轼的《水调歌头》。", subject: "语文", difficulty: "medium" },
  { id: 105, question: "《白鹭》这篇课文的作者是：", options: ["朱自清", "郭沫若", "冰心", "老舍"], correct: 1, explanation: "《白鹭》的作者是郭沫若，描写了白鹭的优美形态。", subject: "语文", difficulty: "easy" },
  { id: 106, question: "\"不以规矩，不能成方圆\"出自：", options: ["《论语》", "《孟子》", "《庄子》", "《荀子》"], correct: 1, explanation: "出自《孟子·离娄上》，意为没有规矩就不能画出方和圆。", subject: "语文", difficulty: "medium" },
];

// Elementary English Questions
const elemEnglishQuestions: Question[] = [
  { id: 201, question: "What is the past tense of 'go'?", options: ["goed", "gone", "went", "going"], correct: 2, explanation: "go的过去式是went，属于不规则变化动词。", subject: "英语", difficulty: "easy" },
  { id: 202, question: "She ___ to school every day.", options: ["go", "goes", "going", "went"], correct: 1, explanation: "主语是第三人称单数She，动词要加s。", subject: "英语", difficulty: "easy" },
  { id: 203, question: "Which one is correct?", options: ["I have a apple.", "I have an apple.", "I has an apple.", "I have an apples."], correct: 1, explanation: "apple以元音开头，用an；主语I用have。", subject: "英语", difficulty: "easy" },
  { id: 204, question: "What's the opposite of 'hot'?", options: ["warm", "cool", "cold", "wet"], correct: 2, explanation: "hot（热）的反义词是cold（冷）。", subject: "英语", difficulty: "easy" },
  { id: 205, question: "___ is the first day of the week.", options: ["Monday", "Sunday", "Saturday", "Friday"], correct: 1, explanation: "在西方，一周的第一天是Sunday（星期日）。", subject: "英语", difficulty: "easy" },
];

// Middle School Math
const middleMathQuestions: Question[] = [
  { id: 301, question: "计算: (-3) × (-4) = ?", options: ["-12", "12", "-7", "7"], correct: 1, explanation: "负负得正：(-3) × (-4) = 12", subject: "数学", difficulty: "easy" },
  { id: 302, question: "若 2x - 5 = 11，则 x = ?", options: ["3", "8", "6", "16"], correct: 1, explanation: "2x = 11 + 5 = 16，x = 16 ÷ 2 = 8", subject: "数学", difficulty: "easy" },
  { id: 303, question: "一元二次方程 x² - 5x + 6 = 0 的解是：", options: ["x=2, x=3", "x=1, x=6", "x=-2, x=-3", "x=2, x=-3"], correct: 0, explanation: "因式分解：(x-2)(x-3) = 0，所以x=2或x=3", subject: "数学", difficulty: "medium" },
  { id: 304, question: "△ABC中，∠A=50°, ∠B=60°, 则∠C=?", options: ["90°", "70°", "80°", "60°"], correct: 1, explanation: "三角形内角和=180°，∠C = 180° - 50° - 60° = 70°", subject: "数学", difficulty: "easy" },
  { id: 305, question: "函数 y = 2x + 1 的图象经过哪个象限？", options: ["一、二、三象限", "一、二、四象限", "一、三象限", "一、二、三、四象限"], correct: 0, explanation: "斜率为正，y轴截距为正，图象经过一、二、三象限。", subject: "数学", difficulty: "medium" },
  { id: 306, question: "圆的直径为10，则圆的面积约为：", options: ["78.5", "31.4", "25", "50"], correct: 0, explanation: "r = 10/2 = 5, S = π × r² ≈ 3.14 × 25 = 78.5", subject: "数学", difficulty: "easy" },
];

// Middle School Physics
const middlePhysicsQuestions: Question[] = [
  { id: 401, question: "声音在真空中能传播吗？", options: ["能", "不能", "只能传播部分", "取决于温度"], correct: 1, explanation: "声音的传播需要介质，真空中没有介质，所以声音不能在真空中传播。", subject: "物理", difficulty: "easy" },
  { id: 402, question: "一个物体做匀速直线运动，速度为5m/s，通过100m需要多长时间？", options: ["500s", "20s", "95s", "105s"], correct: 1, explanation: "t = s/v = 100m ÷ 5m/s = 20s", subject: "物理", difficulty: "easy" },
  { id: 403, question: "冰熔化时温度：", options: ["升高", "降低", "保持0°C不变", "先升后降"], correct: 2, explanation: "冰是晶体，熔化过程中吸热但温度保持在0°C不变。", subject: "物理", difficulty: "easy" },
  { id: 404, question: "在光的折射中，光线从空气射入水中时：", options: ["折射角大于入射角", "折射角等于入射角", "折射角小于入射角", "不发生折射"], correct: 2, explanation: "从光疏介质（空气）进入光密介质（水），折射角小于入射角。", subject: "物理", difficulty: "medium" },
];

// Middle School Chemistry
const middleChemistryQuestions: Question[] = [
  { id: 501, question: "空气中体积分数最大的气体是：", options: ["氧气", "氮气", "二氧化碳", "稀有气体"], correct: 1, explanation: "氮气约占空气体积的78%，是空气中含量最多的气体。", subject: "化学", difficulty: "easy" },
  { id: 502, question: "下列变化属于化学变化的是：", options: ["冰融化", "铁生锈", "汽油挥发", "矿石粉碎"], correct: 1, explanation: "铁生锈是铁与氧气、水发生化学反应，生成了新物质（铁锈）。", subject: "化学", difficulty: "easy" },
  { id: 503, question: "水（H₂O）由哪些元素组成？", options: ["氢和氧", "氢和碳", "碳和氧", "氮和氧"], correct: 0, explanation: "H₂O中H代表氢元素，O代表氧元素，水由氢和氧两种元素组成。", subject: "化学", difficulty: "easy" },
];

// High School Math
const highMathQuestions: Question[] = [
  { id: 601, question: "集合A={1,2,3}，B={2,3,4}，A∩B=?", options: ["{1,2,3,4}", "{2,3}", "{1,4}", "∅"], correct: 1, explanation: "A∩B是A和B的公共元素，即{2,3}。", subject: "数学", difficulty: "easy" },
  { id: 602, question: "函数 f(x) = x² - 4x + 3 的最小值是：", options: ["-1", "0", "3", "-4"], correct: 0, explanation: "f(x) = (x-2)² - 1，顶点为(2,-1)，最小值为-1。", subject: "数学", difficulty: "medium" },
  { id: 603, question: "若 log₂8 = x，则 x = ?", options: ["2", "3", "4", "8"], correct: 1, explanation: "2³ = 8，所以 log₂8 = 3", subject: "数学", difficulty: "easy" },
  { id: 604, question: "sin30° 的值等于：", options: ["√3/2", "1/2", "√2/2", "1"], correct: 1, explanation: "特殊角三角函数值：sin30° = 1/2", subject: "数学", difficulty: "easy" },
  { id: 605, question: "等差数列{aₙ}中，a₁=2, d=3, 则a₁₀=?", options: ["29", "32", "27", "30"], correct: 0, explanation: "aₙ = a₁ + (n-1)d = 2 + 9×3 = 29", subject: "数学", difficulty: "medium" },
  { id: 606, question: "函数 f(x) = eˣ 的导数是：", options: ["xeˣ⁻¹", "eˣ", "eˣ⁺¹", "1/x"], correct: 1, explanation: "eˣ的导数仍然是eˣ，这是指数函数的重要性质。", subject: "数学", difficulty: "medium" },
];

// High School Physics
const highPhysicsQuestions: Question[] = [
  { id: 701, question: "物体做自由落体运动，2秒末的速度约为（g取10m/s²）：", options: ["10m/s", "20m/s", "40m/s", "5m/s"], correct: 1, explanation: "v = gt = 10 × 2 = 20m/s", subject: "物理", difficulty: "easy" },
  { id: 702, question: "牛顿第二定律的表达式是：", options: ["F=mv", "F=ma", "F=mg", "F=m/a"], correct: 1, explanation: "牛顿第二定律：合力等于质量乘以加速度，F=ma。", subject: "物理", difficulty: "easy" },
  { id: 703, question: "一物体从30m高处自由下落，落地时的速度约为（g取10m/s²）：", options: ["10√6 m/s", "√600 m/s", "30m/s", "20m/s"], correct: 1, explanation: "v² = 2gh = 2×10×30 = 600, v = √600 ≈ 24.5m/s", subject: "物理", difficulty: "medium" },
];

// High School Chemistry
const highChemistryQuestions: Question[] = [
  { id: 801, question: "下列反应属于氧化还原反应的是：", options: ["NaOH+HCl=NaCl+H₂O", "CaCO₃=CaO+CO₂", "2Na+Cl₂=2NaCl", "NaCl+AgNO₃=AgCl+NaNO₃"], correct: 2, explanation: "2Na+Cl₂=2NaCl中Na化合价从0升高到+1（被氧化），Cl从0降低到-1（被还原）。", subject: "化学", difficulty: "medium" },
  { id: 802, question: "1mol水的质量是：", options: ["1g", "18g", "16g", "2g"], correct: 1, explanation: "水的摩尔质量M = 2×1 + 16 = 18g/mol，1mol水的质量为18g。", subject: "化学", difficulty: "easy" },
];

// Exam configurations
export const examConfigs: Record<string, ExamConfig[]> = {
  elementary: [
    { id: "elem-math", title: "小学数学综合测试", subject: "数学", grade: "小学", duration: 30, questions: elemMathQuestions },
    { id: "elem-chinese", title: "小学语文综合测试", subject: "语文", grade: "小学", duration: 30, questions: elemChineseQuestions },
    { id: "elem-english", title: "小学英语综合测试", subject: "英语", grade: "小学", duration: 25, questions: elemEnglishQuestions },
  ],
  middle: [
    { id: "mid-math", title: "初中数学综合测试", subject: "数学", grade: "初中", duration: 45, questions: middleMathQuestions },
    { id: "mid-physics", title: "初中物理综合测试", subject: "物理", grade: "初中", duration: 40, questions: middlePhysicsQuestions },
    { id: "mid-chemistry", title: "初中化学综合测试", subject: "化学", grade: "初中", duration: 35, questions: middleChemistryQuestions },
  ],
  high: [
    { id: "high-math", title: "高中数学综合测试", subject: "数学", grade: "高中", duration: 60, questions: highMathQuestions },
    { id: "high-physics", title: "高中物理综合测试", subject: "物理", grade: "高中", duration: 50, questions: highPhysicsQuestions },
    { id: "high-chemistry", title: "高中化学综合测试", subject: "化学", grade: "高中", duration: 45, questions: highChemistryQuestions },
  ],
};

export function getAllExamConfigs(): ExamConfig[] {
  return Object.values(examConfigs).flat();
}
