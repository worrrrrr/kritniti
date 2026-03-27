<script>
  // ========== ข้อมูลคำถามทั้งหมด ==========
  const questions = [
    // Q1 - S/N
    { id: 1, text: "ถ้าต้องอธิบาย 'ความรัก' หรือ 'ความสำเร็จ' ให้เด็กฟัง คุณจะ...", options: [
      { value: "S", text: "ยกตัวอย่างสิ่งที่มองเห็นและทำได้จริง (เช่น การกอด การมีเงิน การดูแล)" },
      { value: "N", text: "อธิบายเป็นแนวคิดเชิงเปรียบเทียบ (เช่น แสงสว่าง จิ๊กซอว์ที่ต่อกัน ความว่างเปล่า)" }
    ]},
    // Q2 - T/F
    { id: 2, text: "ถ้าเพื่อนสนิททำผิดกฎร้ายแรงจนต้องโดนไล่ออก คุณจะ...", options: [
      { value: "T", text: "ยึดตามความถูกต้องของระบบ เพื่อความยุติธรรม" },
      { value: "F", text: "พยายามหาวิธีช่วยเพื่อน เพื่อรักษาความรู้สึกและความสัมพันธ์" }
    ]},
    // Q3 - J/P
    { id: 3, text: "เมื่อต้องทำงานเป็นทีมหรือประสานงานกับผู้อื่น บทบาทที่คุณถนัดที่สุดคือ...", options: [
      { value: "J", text: "คนกำหนดโครงสร้าง วางกรอบ จัดการเวลาและความคาดหวังของทีม" },
      { value: "P", text: "คนเสนอไอเดีย ปรับตัวตามสถานการณ์ ช่วยให้ทีมยืดหยุ่น" }
    ]},
    // Q4 - I/E
    { id: 4, text: "หลังจบกิจกรรมต่อไปนี้ อันไหนที่ทำให้คุณรู้สึกว่า 'แบตเตอรี่เต็ม' จริงๆ?", options: [
      { value: "I", text: "อยู่คนเดียวในห้องสมุดที่มีทุกอย่างที่อยากรู้" },
      { value: "E", text: "ออกไปปาร์ตี้กับคนเจ๋งๆ ทั้งคืน" }
    ]},
    // Q5 - Ni vs Ne
    { id: 5, text: "เมื่อคิดถึงอนาคต คุณมักจะ...", options: [
      { value: "Ni", text: "มองเห็นภาพรวมหรือจุดหมายที่ชัดเจนในใจ แล้วค่อยหาแนวทางไปให้ถึง" },
      { value: "Ne", text: "มองเห็นความเป็นไปได้หลากหลาย เชื่อมโยงไอเดียต่างๆ เข้าด้วยกัน" }
    ]},
    // Q6 - Si vs Se
    { id: 6, text: "เวลาคุณต้องตัดสินใจในสถานการณ์เฉพาะหน้า คุณมักเชื่อ...", options: [
      { value: "Si", text: "ประสบการณ์ที่เคยเกิดขึ้นและข้อมูลรายละเอียดที่เก็บสะสมไว้" },
      { value: "Se", text: "การตอบสนองทันทีตามสภาพแวดล้อมและสัญชาตญาณขณะนั้น" }
    ]},
    // Q7 - Inferior Function
    { id: 7, text: "เวลาที่คุณสติแตกที่สุด หรือฟิวส์ขาด คุณจะกลายเป็นคนแบบไหน?", options: [
      { value: "infSe", text: "มุทะลุ ใจร้อน ทำอะไรเกินตัว ใช้เงิน/กินเหล้า ใจแตก" },
      { value: "infFi", text: "เจ้าน้ำตา น้อยใจ รู้สึกไม่มีใครรัก ทุกคนทอดทิ้ง" },
      { value: "infNe", text: "ระแวง คิดฟุ้งซ่านเรื่องร้ายๆ ที่ยังไม่เกิด กลัวไปหมด" },
      { value: "infTi", text: "เย็นชา วิเคราะห์หาคนผิดแบบไร้หัวใจ พูดจาทิ่มแทง" },
      { value: "infTe", text: "จู้จี้จุกจิก ควบคุม ต้องการให้ทุกอย่างเป็นระเบียบ เอาแต่ใจตัวเอง" }
    ]},
    // Q8 - คำวิจารณ์ที่จี๊ดที่สุด
    { id: 8, text: "คำวิจารณ์ไหนที่ฟังแล้ว 'จี๊ดถึงกระดูก' และยอมรับยากที่สุด?", options: [
      { value: "T", text: "“คุณมันไร้เหตุผล/โง่”" },
      { value: "F", text: "“คุณมันเห็นแก่ตัว/ไร้น้ำใจ”" },
      { value: "S", text: "“คุณมันเพ้อเจ้อ/ไม่อยู่กับร่องกับรอย”" },
      { value: "N", text: "“คุณมันหัวโบราณ/โลกแคบ”" }
    ]},
    // Q9 - Hornevian Triads
    { id: 9, text: "เวลาเจอเรื่องที่ทำให้สติหลุดหรือเครียดจัด ปฏิกิริยาแรกที่คุณคุมไม่ได้คืออะไร?", options: [
      { value: "withdrawn", text: "ถอยหนี เก็บตัว เงียบๆ หนีเข้าหาตัวเอง" },
      { value: "assertive", text: "เดินหน้า ลุยจัดการ ต้องทำอะไรสักอย่าง" },
      { value: "compliant", text: "เข้าหา พึ่งพา ค้นหาคนช่วยหรือทำให้ถูกใจ" }
    ]},
    // Q10 - Center of Intelligence
    { id: 10, text: "ความรู้สึกไหนที่คุณรู้สึกว่ามัน 'พุ่งขึ้นมา' เร็วที่สุดเวลาโดนกระทบ?", options: [
      { value: "gut", text: "โกรธ/หงุดหงิด ขึ้นมาทันที" },
      { value: "heart", text: "นอยด์/อาย รู้สึกเจ็บในใจ" },
      { value: "head", text: "กังวล/ระแวง คิดวนไปมา" }
    ]},
    // Q11 - Core Desire
    { id: 11, text: "ถ้าต้องสละทุกอย่างทิ้ง เหลือได้แค่หนึ่งเดียวเพื่อให้อยู่รอด คุณจะรักษาอะไรไว้? (เลือกข้อที่คุณ 'รับไม่ได้' ที่สุดถ้าต้องเสีย)", options: [
      { value: "5", text: "ความรู้ ความเก่ง ความสามารถพึ่งตนเอง" },
      { value: "2", text: "ความรัก การเป็นที่ต้องการของคนอื่น" },
      { value: "8", text: "อำนาจ การควบคุมสถานการณ์" },
      { value: "9", text: "ความสงบ ปราศจากความขัดแย้ง" },
      { value: "1", text: "ความถูกต้อง ความสมบูรณ์แบบ" },
      { value: "7", text: "ความสนุก อิสรภาพในการลองสิ่งใหม่" },
      { value: "6", text: "ความมั่นคง ความปลอดภัย" },
      { value: "4", text: "ความพิเศษ ตัวตนที่แตกต่าง" },
      { value: "3", text: "ความสำเร็จ ภาพลักษณ์ที่คนยอมรับ" }
    ]},
    // Q12 - Legacy
    { id: 12, text: "ในวาระสุดท้ายของชีวิต คุณอยากให้โลกจดจำคุณในฐานะอะไร?", options: [
      { value: "5", text: "ผู้มีปัญญา ผู้ให้ความรู้" },
      { value: "3", text: "ผู้สร้างประโยชน์ ผู้เปลี่ยนแปลง" },
      { value: "4", text: "ผู้ที่แตกต่าง มีเอกลักษณ์" },
      { value: "2", text: "ผู้สร้างความผูกพัน ผู้ให้ความรัก" },
      { value: "9", text: "ผู้รักษาความสงบ ผู้ประสาน" },
      { value: "1", text: "ผู้ยึดมั่นความถูกต้อง ผู้มีหลักการ" },
      { value: "7", text: "ผู้ให้ความสนุก ผู้เติมสีสัน" },
      { value: "6", text: "ผู้ที่เชื่อถือได้ ซื่อสัตย์" },
      { value: "8", text: "ผู้นำ ผู้มีอำนาจ" }
    ]},
    // Q13 - Deal Breaker
    { id: 13, text: "การกระทำแบบไหนของคนอื่นที่ทำให้คุณ 'หมดความอดทน' และตัดขาดได้ทันที?", options: [
      { value: "5", text: "ดูถูกว่าโง่ ไม่มีความสามารถ" },
      { value: "8", text: "เอาเปรียบ ข่มเหง ใช้อำนาจ" },
      { value: "1", text: "ไม่ยุติธรรม ลำเอียง" },
      { value: "6", text: "หักหลัง หลอกลวง ไม่น่าไว้วางใจ" },
      { value: "4", text: "มองไม่เห็นคุณค่าในตัวตนของฉัน" },
      { value: "7", text: "จำกัดอิสระ บังคับให้ทำตาม" },
      { value: "9", text: "ทำลายความสงบ สร้างความขัดแย้งโดยไม่จำเป็น" },
      { value: "2", text: "ดูถูกคนอื่น ทำลายคุณค่าความเป็นมนุษย์" },
      { value: "3", text: "ปฏิเสธความช่วยเหลือของฉันโดยไม่ให้เกียรติ" }
    ]},
    // Q14 - Inner Sanctum
    { id: 14, text: "ที่พักใจที่ทำให้คุณรู้สึกเป็นตัวเองและปลอดภัยที่สุดคือที่ไหน/กิจกรรมอะไร?", options: [
      { value: "I", text: "อยู่คนเดียว อ่านหนังสือ ทำงานส่วนตัว" },
      { value: "E", text: "อยู่กับครอบครัว คนรัก เพื่อนสนิท" },
      { value: "I", text: "อยู่ในธรรมชาติ ทำงานศิลปะ ดนตรี" },
      { value: "E", text: "ทำงานที่ท้าทาย ได้ลงมือสร้างสิ่งใหม่" },
      { value: "I", text: "อยู่ในสถานที่เงียบสงบ ไม่มีเสียงรบกวน" }
    ]},
    // Q15 - Philosophy
    { id: 15, text: "คุณเชื่อว่าชีวิตคนเราคือ...", options: [
      { value: "macro", text: "เราลิขิตเอง" },
      { value: "micro", text: "ถูกโครงสร้างบางอย่างกำหนดไว้แล้ว" }
    ]},
    // Q16 - Cross-check
    { id: 16, text: "อ่านข้อความต่อไปนี้ แล้วเลือกข้อที่คุณรู้สึกว่า 'นี่คือฉัน' มากที่สุด", options: [
      { value: "INFJ", text: "ฉันมองภาพรวม วางแผนระยะยาว แต่ก็ยืดหยุ่นตามสัญชาตญาณ ใส่ใจความรู้สึกคนรอบข้าง" },
      { value: "INFP", text: "ฉันมีความคิดเป็นของตัวเอง มีหลักการในใจ ชอบสำรวจความเป็นไปได้ และรักษาความเป็นตัวตน" },
      { value: "ETJ", text: "ฉันลงมือทำ มีระบบ ชอบควบคุมสถานการณ์ให้เกิดผลลัพธ์ตามเป้าหมาย" },
      { value: "STP", text: "ฉันปรับตัวได้ดี อยู่กับปัจจุบัน ชอบลงมือจริง และใส่ใจรายละเอียด" },
      { value: "ENXP", text: "ฉันสร้างแรงบันดาลใจ มองโลกในแง่ดี ชอบพบปะผู้คน และเปิดรับสิ่งใหม่" },
      { value: "SFJ", text: "ฉันให้ความสำคัญกับความสัมพันธ์ ดูแลคนรอบข้าง และชอบความสงบเรียบร้อย" },
      { value: "8", text: "ฉันรักอิสระ ชอบท้าทาย และไม่ยอมให้ใครมาบงการชีวิต" },
      { value: "6", text: "ฉันต้องการความมั่นคง ไว้วางใจได้ และชอบมีแผนเผื่อไว้" }
    ]}
  ];

  // ========== Reactive state ==========
  let currentStep = $state(0);
  let answers = $state(Array(questions.length).fill(null));
  let showResult = $state(false);
  let mbtiResult = $state("");
  let enneagramType = $state("");
  let enneagramWing = $state("");
  let resultDetail = $state("");

  function handleAnswer(questionIndex, value) {
    const newAnswers = [...answers];
    if (newAnswers[questionIndex] === value) return;
    newAnswers[questionIndex] = value;
    answers = newAnswers;

    if (currentStep < questions.length - 1) {
      currentStep++;
    } else {
      computeResults();
    }
  }

  function goPrev() {
    if (currentStep > 0) currentStep--;
  }

  // ========== คำนวณ MBTI ==========
  function computeMBTI(ans) {
    // I/E
    let ie = "";
    if (ans[3] === "I") ie = "I";
    else if (ans[3] === "E") ie = "E";
    if (!ie && ans[13]) {
      if (ans[13] === "I") ie = "I";
      else if (ans[13] === "E") ie = "E";
    }
    if (!ie) ie = "I";

    // S/N
    let sCount = 0, nCount = 0;
    if (ans[0] === "S") sCount++; else if (ans[0] === "N") nCount++;
    if (ans[4] === "Si") sCount++; else if (ans[4] === "Ni" || ans[4] === "Ne") nCount++;
    if (ans[5] === "Si") sCount++; else if (ans[5] === "Se") sCount++;
    if (ans[7] === "S") sCount++; else if (ans[7] === "N") nCount++;
    let sn = sCount > nCount ? "S" : "N";

    // T/F
    let tCount = 0, fCount = 0;
    if (ans[1] === "T") tCount++; else if (ans[1] === "F") fCount++;
    if (ans[7] === "T") tCount++; else if (ans[7] === "F") fCount++;
    let tf = tCount > fCount ? "T" : "F";

    // J/P
    let jp = "";
    if (ans[2] === "J") jp = "J";
    else if (ans[2] === "P") jp = "P";
    if (!jp && ans[6]) {
      const inf = ans[6];
      if (inf === "infSe") jp = "J";
      else if (inf === "infFi") jp = "J";
      else if (inf === "infNe") jp = "P";
      else if (inf === "infTi") jp = "J";
      else if (inf === "infTe") jp = "P";
    }
    if (!jp) jp = "J";

    // Cross-check with Q16
    if (ans[15]) {
      const cross = ans[15];
      if (cross === "INFJ") return "INFJ";
      if (cross === "INFP") return "INFP";
      if (cross === "ETJ") return `${ie}${sn}${tf}J`;
      if (cross === "STP") return `${ie}${sn}${tf}P`;
      if (cross === "ENXP") return `E${sn}${tf}P`;
      if (cross === "SFJ") return `${ie}${sn}${tf}J`;
      if (cross === "8") return `${ie}${sn}${tf}P`;
      if (cross === "6") return `${ie}${sn}${tf}J`;
    }
    return `${ie}${sn}${tf}${jp}`;
  }

  // ========== คำนวณ Enneagram (พร้อม wing) ==========
  function computeEnneagramWithWing(ans) {
    const triad = ans[8];
    const center = ans[9];
    const coreDesire = ans[10];
    const legacy = ans[11];
    const dealBreaker = ans[12];
    const cross = ans[15];

    // ขั้นที่ 1: หา possible types ตาม triad + center
    let possibleTypes = [];
    if (triad === "withdrawn") {
      if (center === "gut") possibleTypes = [9];
      else if (center === "heart") possibleTypes = [4];
      else if (center === "head") possibleTypes = [5];
    } else if (triad === "assertive") {
      if (center === "gut") possibleTypes = [8];
      else if (center === "heart") possibleTypes = [3];
      else if (center === "head") possibleTypes = [7];
    } else if (triad === "compliant") {
      if (center === "gut") possibleTypes = [1];
      else if (center === "heart") possibleTypes = [2];
      else if (center === "head") possibleTypes = [6];
    }

    // ขั้นที่ 2: นับคะแนนโหวตจาก 11,12,13, cross
    const votes = {};
    const addVote = (type) => { votes[type] = (votes[type] || 0) + 1; };
    if (coreDesire) addVote(parseInt(coreDesire));
    if (legacy) addVote(parseInt(legacy));
    if (dealBreaker) addVote(parseInt(dealBreaker));
    if (cross === "8") addVote(8);
    if (cross === "6") addVote(6);

    // หา main type
    let bestType = null;
    let bestCount = 0;
    for (const type of possibleTypes) {
      const count = votes[type] || 0;
      if (count > bestCount) {
        bestCount = count;
        bestType = type;
      }
    }
    if (!bestType && possibleTypes.length === 1) bestType = possibleTypes[0];
    if (!bestType) return { type: "?", wing: null };

    // ขั้นที่ 3: หา wing โดยดูคะแนนของประเภทที่อยู่ติดกัน
    const adjLeft = bestType === 1 ? 9 : bestType - 1;
    const adjRight = bestType === 9 ? 1 : bestType + 1;

    let leftScore = 0, rightScore = 0;

    // ฟังก์ชันช่วยนับคะแนนจาก votes และจากข้อ cross ที่เป็นตัวเลข
    const getScore = (type) => votes[type] || 0;

    leftScore = getScore(adjLeft);
    rightScore = getScore(adjRight);

    let wing = null;
    if (leftScore > rightScore) wing = adjLeft;
    else if (rightScore > leftScore) wing = adjRight;
    // ถ้าเท่ากัน ไม่แสดง wing

    return { type: bestType, wing };
  }

  function computeResults() {
    if (answers.some(a => a === null)) {
      alert("กรุณาตอบคำถามให้ครบทุกข้อ");
      return;
    }
    mbtiResult = computeMBTI(answers);
    const ennea = computeEnneagramWithWing(answers);
    enneagramType = ennea.type.toString();
    enneagramWing = ennea.wing ? `w${ennea.wing}` : "";
    const enneagramDisplay = enneagramWing ? `Type ${enneagramType}${enneagramWing}` : `Type ${enneagramType}`;
    resultDetail = `MBTI: ${mbtiResult} | Enneagram: ${enneagramDisplay}`;
    showResult = true;
  }

  function resetTest() {
    answers = Array(questions.length).fill(null);
    currentStep = 0;
    showResult = false;
    mbtiResult = "";
    enneagramType = "";
    enneagramWing = "";
    resultDetail = "";
  }

</script>

<div class="container relative overflow-hidden shadow-[0_0_50px_rgba(59,130,246,0.15)] rounded-[2rem] border border-slate-700/50 bg-slate-900/80 backdrop-blur-xl p-10 max-w-xl mx-auto mt-12 transition-all duration-500">
  
  <div class="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/20 blur-[80px] rounded-full pointer-events-none"></div>
  <div class="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/10 blur-[80px] rounded-full pointer-events-none"></div>

  {#if !showResult}
    <div class="mb-8">
      <div class="flex justify-between items-end mb-2">
        <span class="text-xs font-mono uppercase tracking-[0.2em] text-blue-400">Step System</span>
        <span class="text-sm font-bold text-slate-400 italic">{currentStep + 1} / {questions.length}</span>
      </div>
      <div class="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
        <div 
          class="h-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-500 shadow-[0_0_10px_rgba(34,211,238,0.5)]"
          style="width: {(currentStep + 1) / questions.length * 100}%"
        ></div>
      </div>
    </div>

    <div class="question-card relative z-10">
      <h3 class="text-2xl font-light text-white leading-relaxed mb-8 tracking-wide">
        {questions[currentStep].text}
      </h3>
      
      <div class="options space-y-4">
        {#each questions[currentStep].options as option, idx}
          <button
            class="group relative flex items-center p-5 w-full rounded-2xl border transition-all duration-300 overflow-hidden
            {answers[currentStep] === option.value 
              ? 'border-blue-500 bg-blue-500/10 text-white shadow-[0_0_20px_rgba(59,130,246,0.2)]' 
              : 'border-slate-800 bg-slate-800/40 text-slate-400 hover:border-slate-600 hover:bg-slate-800/80'}"
            onclick={() => handleAnswer(currentStep, option.value)}
          >
            <div class="mr-4 w-2 h-2 rounded-full transition-all duration-300
              {answers[currentStep] === option.value ? 'bg-blue-400 scale-125 shadow-[0_0_8px_rgba(96,165,250,0.8)]' : 'bg-slate-700 group-hover:bg-slate-500'}">
            </div>
            
            <span class="text-lg font-normal tracking-wide">{option.text}</span>
            
            <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]"></div>
          </button>
        {/each}
      </div>

      <div class="nav-buttons mt-10 flex justify-between items-center">
        {#if currentStep > 0}
          <button onclick={goPrev} class="text-sm font-mono text-slate-500 hover:text-blue-400 transition-colors flex items-center gap-2 group">
            <span class="group-hover:-translate-x-1 transition-transform">←</span> BACK
          </button>
        {:else}
          <div></div>
        {/if}
        
        <div class="text-[10px] text-slate-600 font-mono tracking-widest uppercase">
          Neural Interface Active
        </div>
      </div>
    </div>

  {:else}
    <div class="result-card text-center py-6 relative z-10 animate-in fade-in zoom-in duration-700">
      <div class="inline-block p-1 mb-6 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500">
          <div class="px-6 py-2 rounded-full bg-slate-900 text-xs font-bold tracking-[0.3em] uppercase text-blue-400">
            Analysis Complete
          </div>
      </div>
      
      <h2 class="text-4xl font-bold text-white mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-400">
        ผลลัพธ์ของคุณ
      </h2>
      
      <div class="my-8 p-8 rounded-3xl bg-blue-500/5 border border-blue-500/20 shadow-inner">
        <p class="text-2xl text-blue-300 font-medium leading-relaxed italic">
          "{resultDetail}"
        </p>
      </div>

      <p class="text-slate-400 mb-10 text-sm leading-loose max-w-sm mx-auto">
        อัลกอริทึมได้คำนวณบุคลิกภาพของคุณผ่าน MBTI และ Enneagram เรียบร้อยแล้ว
      </p>

      <button 
        onclick={resetTest} 
        class="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-2xl shadow-[0_10px_30px_rgba(59,130,246,0.3)] hover:shadow-blue-500/40 transition-all duration-300 active:scale-95 uppercase tracking-widest text-sm"
      >
        Retake Analysis
      </button>
    </div>
  {/if}
</div>

<style>
  
</style>