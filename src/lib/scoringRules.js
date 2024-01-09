export const scoringRulesDict = {
    '1005': `Char, traces, cones are assummed max lvl. (only relics matter here)<br><br></br>
        Scores are calculated as: 3 * flwup + 3 * skill + 3 * dot_ult * 0.75 + ult + 3 * dot + 9 * dot_ult, 3 targets <br><br>
        Enemies have no quantum weakness. Dots are scaled by your probability of applying them.`,

    '1204': `Char, traces, cones are assummed max lvl. (only relics matter here)<br><br>
        Scores are calculated as:  4 * skill + 1 ult + 7 stack ll + 10 stack ll, 3 targets
        <br><br>Enemies have no Qua weakness`,

    '1107': `Char, traces, cones are assummed max lvl. (only relics matter)<br><br>
        Scores are calculated as:  2 * e_counter + 2 * counter + 2 * skill + basic # 2 targets
        <br><br>Enemies have no Qua weakness`,

    '1201': `All QQ are assummed to be max char lvl, trace lvl, cone lvl. (only relics affect score)<br><br>
        Scores are calculated as:  ult_dmg + e_basic_atk + 0.24 * autarky. 3 targets
        `,

    


    '1006': `Char, traces, cones are assummed max lvl. (only relics matter)<br><br>
        Scores are calculated as: (2x (Ult + skill + 2x basic) + break + (skill + 2x basic) + 5entanglement) * (prob landing weakness)`,

    '1213': `Char, traces, cones are assummed max lvl. (only relics matter)<br><br>
        Scores are calculated as: Fulgurant Leap, 1 target <br><br>
        Enemy has a debuff, no quanum weakness.`,
    '1209': `Char, traces, cones are assummed max lvl. (only relics matter)<br><br>
        Scores are calculated as: 4Skill + Ult + 3(flwup * freeze) + 8xA2 (5xA2 2flwup and 2 skill comes after ult)<br><br>
        Enemy has no qua weakness.`,

    '1102': "",
    '1208': "",
    '1205': "",
}

export const scoringRulesShort = {
    '1102': "4 buffed SKILL + ULT".toLowerCase(), // Seele
    '1005': "3×(Skill + FUA) + ULT + 12.25×DOT×Chance", // Kafka
    '1006': "weaken*(entang+2ult+3skill)".toLowerCase(), // SW
    '1205': "3×EBASIC + ULT + FUA",  // Blade
    '1201': "ULT+BASIC+0.24AUTARKY".toLowerCase(), // qq
    '1107': "4COUNTER+2SKILL".toLowerCase(), // CLARA
    '1204': "2×Skill + ULT + 10×LL + Benediction (2 targets)", // JING
    '1213': "Fulgurant Leap", // DHIL
    '1209': "2×Skill + ULT + 2×Fua + Freeze × Chance + 3×A2", // Yanqing
    '1208': "0.8EHP + 0.2EHP×(chance to resist dot) + Allies Healed", // Fu Xuan
    '1003': "2×FUA + ULT + 3×SKILL", // Fu Xuan
    '1212': "3×ESkill + ULT", // JL
    '1112': "6×FUA + 2×EFUA", // Topaz
    '1008': "3×Skill + ULT (2 targets)", // Arlan
    '1302': "3×Skill + ULT (3 targets)" // Argenti
}