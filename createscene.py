import json

def generate_pro_scenes():
    # นิยามฟังก์ชันเด่นของแต่ละ Driver ตามเอกสาร
    mapping = {
        "observer":   {"mbti": ["I", "S", "T", "P"], "functions": ["Ti", "Si"], "ennea": 5},
        "seeker":     {"mbti": ["I", "N", "P"],      "functions": ["Ne", "Ni"], "ennea": 7},
        "controller": {"mbti": ["E", "S", "T", "J"], "functions": ["Te", "Se"], "ennea": 1},
        "giver":      {"mbti": ["E", "S", "F"],      "functions": ["Fe", "Fi"], "ennea": 2},
        "integrator": {"mbti": ["E", "N", "F"],      "functions": ["Fe", "Ni"], "ennea": 9}
    }

    # ... (ส่วนของ scenarios 20 ข้อเดิม) ...
    # สมมติตัวอย่าง 1 ข้อ
    raw_scenes = [
        {"id": 1, "title": "งานด่วนวิกฤต", "q": "หัวหน้าสั่งงานด่วนตอนกำลังจะกลับบ้าน..."}
    ]

    final_json = []
    for s in raw_scenes:
        scene = {
            "id": s["id"],
            "title": s["title"],
            "question": s["q"],
            "options": []
        }
        for driver, data in mapping.items():
            scene["options"].append({
                "text": f"ตอบแบบ {driver}", # ตรงนี้เปลี่ยนเป็น Adaptive Text ได้
                "driver": driver,
                "mbti": data["mbti"],
                "ennea": data["ennea"],
                "cog_funcs": data["functions"] # เพิ่มฟิลด์นี้เข้าไป!
            })
        final_json.append(scene)

    with open('scenes.json', 'w', encoding='utf-8') as f:
        json.dump(final_json, f, ensure_ascii=False, indent=2)

generate_pro_scenes()