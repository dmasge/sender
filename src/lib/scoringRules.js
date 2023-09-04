export const scoringRulesDict = {
    'kafka' : `Char, traces, cones are assummed max lvl. (only relics matter here)<br><br></br>
        Scores are calculated as: 3 * flwup + 3 * skill + 3 * dot_ult * 0.75 + ult + 3 * dot + 9 * dot_ult, 3 targets <br><br>
        Enemies have no quantum weakness. Dots are scaled by your probability of applying them.`,

    'jing_yuan' : `Char, traces, cones are assummed max lvl. (only relics matter here)<br><br>
        Scores are calculated as:  4 * skill + 1 ult + 7 stack ll + 10 stack ll, 3 targets
        <br><br>Enemies have no Qua weakness`,

    'clara' : `Char, traces, cones are assummed max lvl. (only relics matter)<br><br>
    Scores are calculated as:  2 * e_counter + 2 * counter + 2 * skill + basic # 2 targets
    <br><br>Enemies have no Qua weakness`,

    'qingque' : `All QQ are assummed to be max char lvl, trace lvl, cone lvl. (only relics affect score)<br><br>
        Scores are calculated as:  ult_dmg + e_basic_atk + 0.24 * autarky. 3 targets
        `,

    'blade' : `Char, traces, cones are assummed max lvl. (only relics matter)<br><br>
        Scores are calculated as: ULT(90% HP loss) + 4x Ebasic + 1x Talent. 3 targets
        <br><br>Enemies have no Qua weakness`,
    
    'seele' : `Char, traces, cones are assummed max lvl. (only relics matter)<br><br>
        Scores are calculated as: 2 skill + ULT + 2 buffed skill`,
    
    'sw' : `Char, traces, cones are assummed max lvl. (only relics matter)<br><br>
        Scores are calculated as: (2x (Ult + skill + 2x basic) + break + (skill + 2x basic) + 5entanglement) * (prob landing weakness)`,

}

export const scoringRulesShort = {
    '1102' : "4SKILL+ULT", // Seele
    '1005' : "15DOT+3SKILL+3FLWUP+ULT", // Kafka
    '1006' : "WEAKEN+ENTANG+2ULT+3SKILL", // SW
    '1205' : "4BASIC+ULT+FLWUP",  // Blade
    '1201' : "ULT+BASIC+0.24AUTARKY",
    '1107' : "4COUNTER+2SKILL", // CLARA
    '1204' : "17LL+4SKILL+ULT", // JING

}