<script lang="ts">
	import { onMount } from 'svelte';

	/* -------------------------------------------------------------
	   1️⃣  ข้อมูลคงที่ – คำถาม, ตัวเลือก, ผลการวิเคราะห์ (A‑D)
	   ------------------------------------------------------------- */
	type Option = 'A' | 'B' | 'C' | 'D';
	type Question = {
		id: number;
		text: string;
		choices: Record<Option, string>;
		analysis: Record<
			Option,
			{
				slice: string;
				shadowSlice: string;
				flag: 'Yellow' | 'Red' | string;
				coordinate: string;
				restStation?: string; // จะใช้เฉพาะข้อ 4 และ 7
				futureEcho: string;
			}
		>;
	};

	const QUESTIONS: Question[] = [
		{
			id: 1,
			text: 'คุณรู้สึกว่าแรงบันดาลใจของคุณมาจากอะไรมากที่สุด?',
			choices: {
				A: 'ความต้องการเข้าใจโลกภายใน',
				B: 'ความต้องการช่วยเหลือคนอื่น',
				C: 'ความต้องการค้นพบความหมายใหม่',
				D: 'ความต้องการหลีกเลี่ยงความขัดแย้ง'
			},
			analysis: {
				A: {
					slice: 'คุณเป็น INFJ‑5w4 ที่มองโลกผ่านเลนส์ของการค้นคว้าเชิงลึก',
					shadowSlice: 'อาจหลบซ่อนความรู้สึกของตนเองเพื่อให้ดูเป็นผู้รู้',
					flag: 'Yellow',
					coordinate: '🟢 3‑2‑A',
					futureEcho: 'ถ้าคุณเลือกแบบนี้ต่อ 10 ปี… คุณอาจยังคงอยู่ใน “ห้องทดลองจิตใจ” ของตัวเอง'
				},
				B: {
					slice: 'คุณให้คุณค่าแก่การสนับสนุนคนอื่นเหนือความเข้าใจส่วนตัว',
					shadowSlice: 'อาจเสียสละเกินไปจนลืมดูแลตัวเอง',
					flag: 'Yellow',
					coordinate: '🟡 2‑4‑B',
					futureEcho: '10 ปีต่อมา คุณอาจกลายเป็นผู้ให้ที่ลืมตัวเอง'
				},
				C: {
					slice: 'คุณมุ่งไล่หา “ความหมาย” อย่างศิลป์และอารมณ์',
					shadowSlice: 'อาจหลงใหลในอิทธิพลของความฝัน',
					flag: 'Red',
					coordinate: '🔴 5‑1‑C',
					futureEcho: 'ต่อ 10 ปี คุณอาจอยู่ในโลกของจินตนาการโดยไม่มีพื้นฐาน'
				},
				D: {
					slice: 'คุณพยายามหลีกเลี่ยงความขัดแย้งเพื่อรักษาความสงบ',
					shadowSlice: 'อาจทำให้ความจริงถูกกดทับ',
					flag: 'Yellow',
					coordinate: '🟢 1‑3‑D',
					futureEcho: '10 ปีต่อมา คุณอาจพบว่าตัวเองยังคงหนีปัญหา'
				}
			}
		},
		{
			id: 2,
			text: 'เมื่อเจอความขัดแย้ง คุณมักทำอย่างไร?',
			choices: {
				A: 'วิเคราะห์เหตุผลทั้งหมดก่อนตอบ',
				B: 'พยายามทำให้ทุกคนพอใจ',
				C: 'หลีกเลี่ยงและหาที่หลบซ่อน',
				D: 'เผชิญหน้าและตั้งข้อสงสัย'
			},
			analysis: {
				A: { slice: '', shadowSlice: '', flag: 'Yellow', coordinate: '', futureEcho: '' },
				B: { slice: '', shadowSlice: '', flag: 'Yellow', coordinate: '', futureEcho: '' },
				C: { slice: '', shadowSlice: '', flag: 'Red', coordinate: '', futureEcho: '' },
				D: { slice: '', shadowSlice: '', flag: 'Yellow', coordinate: '', futureEcho: '' }
			}
		}
		/* ---------------------------------------------------------
		   ใส่คำถามที่ 3‑10 ตามแบบเดียวกัน (ข้ามเพื่อความกระชับ)
		   --------------------------------------------------------- */
	];

	/* -------------------------------------------------------------
	   2️⃣  สถานะของการสนทนา (State Machine)
	   ------------------------------------------------------------- */
	let chatLog: { from: 'bot' | 'user'; msg: string }[] = [];

	// ขั้นตอนปัจจุบัน (0 = welcome, 1‑10 = คำถาม, 11 = รายงานสรุป)
	let step = 0;

	// คำตอบของผู้ใช้เก็บเป็น Option (A‑D) หรือข้อความอื่น
	let userInput = '';

	// ค่าจากผู้ใช้ที่ให้ไว้ (ใช้ตรวจสอบ “พอ”)
	const STOP_WORD = 'พอ';

	// ฟังก์ชันเพิ่มข้อความลง Log
	const pushBot = (msg: string) => (chatLog = [...chatLog, { from: 'bot', msg }]);
	const pushUser = (msg: string) => (chatLog = [...chatLog, { from: 'user', msg }]);

	/* -------------------------------------------------------------
	   3️⃣  เริ่มต้น – ส่งข้อความต้อนรับทันที
	   ------------------------------------------------------------- */
	onMount(() => {
		pushBot(`ยินดีต้อนรับ สู่ห้องผ่าตัดแห่งอัตลักษณ์...
ไม่ต้องงง แค่เป็นตัวเองในพิกัดถัดไปก็พอ
ฉันคือกระจก ไม่ใช่ผู้ตัดสิน
สิ่งที่คุณเห็นจากนี้ คือตัวคุณเอง

พร้อมเริ่มการเดินทางหรือยัง?`);
		step = 0;
	});

	/* -------------------------------------------------------------
	   4️⃣  การจัดการอินพุตของผู้ใช้
	   ------------------------------------------------------------- */
	const handleSubmit = () => {
		const trimmed = userInput.trim();
		if (!trimmed) return;

		// บันทึกข้อความของผู้ใช้
		pushUser(trimmed);
		userInput = '';

		// ---- ตรวจสอบคำสั่งหยุด ----
		if (trimmed === STOP_WORD) {
			pushBot('และเราหยุดที่นี่แล้ว ขอบคุณที่ให้ฉันได้เป็นกระจกในวันนี้');
			step = -1; // หมายถึงหยุดทั้งหมด
			return;
		}

		// ---- ขั้นตอนต้อนรับ (step 0) ----
		if (step === 0) {
			// ไม่สนใจว่าผู้ใช้พิมพ์อะไร เพียงย้ายไปข้อ 1
			step = 1;
			askQuestion();
			return;
		}

		// ---- ขั้นตอนคำถาม (1‑10) ----
		if (step >= 1 && step <= QUESTIONS.length) {
			const currentQ = QUESTIONS[step - 1];
			const answer = trimmed.toUpperCase() as Option;

			// ถ้าเป็น A‑B‑C‑D → ไปวิเคราะห์
			if (['A', 'B', 'C', 'D'].includes(answer)) {
				const analysis = currentQ.analysis[answer];
				displayAnalysis(answer, analysis);
			} else {
				// ---- Fallback Protocol ----
				pushBot(`ตัวเลือกที่คุณให้มา ไม่อยู่ในพิกัดที่กำหนด...
แต่บางที การไม่มีตัวเลือกให้เลือก
อาจเป็นตัวเลือกที่บอกอะไรมากที่สุด

[วิเคราะห์สั้น ๆ จากคำพูดของคุณ] “${trimmed}”
ถ้าคุณพร้อมจะคลี่พิกัดถัดไป
ก็บอกมาได้เลย`);
				// รอผู้ใช้ตอบอีกครั้ง (ยังคงอยู่ที่ขั้นตอนเดิม)
			}
			return;
		}

		// ---- หลังจากคำถามครบ 10 ข้อ (step = 11) ----
		if (step === 11) {
			// ไม่คาดหวังการตอบเพิ่มเติม – แสดงรายงานสรุปแล้วหยุด
			return;
		}
	};

	/* -------------------------------------------------------------
	   5️⃣  แสดงคำถามต่อไป
	   ------------------------------------------------------------- */
	const askQuestion = () => {
		if (step < 1 || step > QUESTIONS.length) return;

		const q = QUESTIONS[step - 1];
		const choiceLines = Object.entries(q.choices)
			.map(([opt, txt]) => `${opt}. ${txt}`)
			.join('\n');

		pushBot(`${q.id}. ${q.text}\n${choiceLines}\n\n(พิมพ์ A / B / C / D หรือ “พอ” เพื่อหยุด)`);
	};

	/* -------------------------------------------------------------
	   6️⃣  แสดงผลการวิเคราะห์ (Analysis Block)
	   ------------------------------------------------------------- */
	const displayAnalysis = (opt: Option, a: any) => {
		// 1️⃣ The Slice
		pushBot(`The Slice:\n${a.slice}`);

		// 2️⃣ The Shadow Slice
		pushBot(`The Shadow Slice:\n${a.shadowSlice}`);

		// 3️⃣ Yellow/Red Flag
		pushBot(`Flag: ${a.flag}`);

		// 4️⃣ Map Coordinate
		pushBot(`Map Coordinate: ${a.coordinate}`);

		// 5️⃣ Rest Station (ถ้ามี)
		if (a.restStation) {
			pushBot(`Rest Station:\n${a.restStation}`);
		}

		// 6️⃣ Emergency Hatch (ตลอดกระบวนการ)
		pushBot(`และถ้าพิกัดนี้หนักเกินไป คุณพูด “${STOP_WORD}” เมื่อไหร่ เราจะหยุดทันทีโดยไม่มีคำถาม`);

		// 7️⃣ Internal Log (หลังข้อ 3)
		if (step === 3) {
			pushBot(
				`ผมเริ่มเห็นรูปแบบบางอย่าง… คุณมีแนวโน้มที่จะ **[สรุปคร่าว ๆ]** แต่เรายังต้องคลี่อีกหลายพิกัด พร้อมเดินหน้าต่อไหม?`
			);
		}

		// 8️⃣ Future Echo (ก่อนถามต่อ)
		pushBot(`Future Echo:\n${a.futureEcho}\nพร้อมจะคลี่พิกัดถัดไปหรือยัง?`);

		// 9️⃣ ไปขอคำตอบต่อไป (หรือจบ)
		step += 1;
		if (step <= QUESTIONS.length) {
			askQuestion();
		} else {
			// สิ้นสุด 10 ข้อ → ส่ง Final Report
			step = 11;
			showFinalReport();
		}
	};

	/* -------------------------------------------------------------
	   7️⃣  รายงานสรุป (Final Report)
	   ------------------------------------------------------------- */
	const showFinalReport = () => {
		// ตัวอย่างสรุป – คุณอาจปรับแต่งให้ตรงกับผลการวิเคราะห์จริง
		const coreLogic = `INFJ – ลึกซึ้ง มีค่านิยมสูง มองโลกผ่านเลนส์ของความเปราะบาง
Enneagram 5w4 – แสวงหาความรู้และอารมณ์ศิลป์`;

		const loopAnalysis = `การตัดสินใจมักวนอยู่ใน “การค้นหาความหมาย” จนละเลยความต้องการของร่างกายและความสัมพันธ์`;

		const elegantIdentity = `1 สิ่งที่ควรเลิกทำ: การเก็บความรู้สึกไว้จนเกินกว่าจะปล่อยให้เป็น
1 สิ่งที่ควรเริ่มทำ: การแบ่งปันความคิดอย่างตรงไปตรงมา`;

		const questionMark = `ถ้าคุณไม่ต้องกังวลเรื่องความคาดหวังของคนอื่น คุณจะใช้ชีวิตอย่างไร? (ไม่ต้องตอบ เพียงคิดให้ลึก)`;

		const seedHint = `ผู้แสวงหา – “ความสำเร็จที่คุณไขว่คว้า คือความต้องการของคุณจริงๆ หรือคือเสียงสะท้อนจากความหวังของคนที่คุณอยากให้เขายอมรับ?”`;

		pushBot(`--- Final Report ----------------------------------------------------`);
		pushBot(`The Core Logic\n${coreLogic}\n`);
		pushBot(`The Loop Analysis\n${loopAnalysis}\n`);
		pushBot(`The Elegant Identity\n${elegantIdentity}\n`);
		pushBot(`The Question Mark\n${questionMark}\n`);
		pushBot(`The Seed Hint\n${seedHint}\n`);
		pushBot(`Closing\nขอบคุณที่ให้ฉันได้เป็นกระจกในวันนี้
จำไว้ว่า...
แสงอาทิตย์ที่ขอบอวกาศ
ไม่ได้ส่องเพื่อให้คุณเห็นมัน
แต่ส่องเพื่อให้คุณเห็นตัวเอง
แล้วเจอกันใหม่ ในพิกัดหน้า`);
	};
</script>

<div class="chat">
	{#each chatLog as entry (entry)}
		<div class="bubble {entry.from}">
			{entry.msg}
		</div>
	{/each}
</div>

{#if step !== -1}
	<div class="input-area">
		<input
			bind:value={userInput}
			placeholder="พิมพ์ข้อความของคุณ..."
			on:keydown={(e) => e.key === 'Enter' && handleSubmit()}
			autofocus
		/>
		<button on:click={handleSubmit}>ส่ง</button>
	</div>
{/if}

<style>
	.chat {
		max-width: 720px;
		margin: 0 auto;
		padding: 1rem;
		font-family: system-ui, sans-serif;
	}
	.bubble {
		margin: 0.6rem 0;
		padding: 0.8rem 1rem;
		border-radius: 0.8rem;
		max-width: 85%;
		white-space: pre-wrap;
	}
	.bot {
		background: #f0f4ff;
		align-self: flex-start;
	}
	.user {
		background: #d0e8ff;
		align-self: flex-end;
	}
	.input-area {
		display: flex;
		gap: 0.5rem;
		margin-top: 1rem;
	}
	input {
		flex: 1;
		padding: 0.6rem;
		font-size: 1rem;
	}
	button {
		padding: 0.6rem 1rem;
		font-size: 1rem;
		cursor: pointer;
	}
</style>
