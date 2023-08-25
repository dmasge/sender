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
        `

}