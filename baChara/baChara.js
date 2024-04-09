(() => {

  "use strict";


  const CSS_ADD = `
  .bachar-char-expbar::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background: #2d4c72;
    cursor: pointer;
  }
  
  .bachar-char-expbar::-moz-range-thumb {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    background: #2d4c72;
    cursor: pointer;
  }
  
  .bachar-stats-data-detail-button{
    cursor: pointer;
    transition: transform ease-in-out 0.2s;
  }
  
  .bachar-stats-info .bachar-stats-data .bachar-stats-data-detail-button:hover{
    transform: scale(0.95) skew(-10deg);
  }
  
  .bachar-stats{
    position: relative;
  }
  
  .bachar-stats-data-float-panel{
    position: absolute;
    background: white;
    border-radius: 15px;
    border: #2d4c72 solid 5px;
    box-shadow: 0 3px 2px lightgrey;
    top: 80px;
    left: 40px;
    width: 440px;
    padding: 5px;
    transform: scale(1);
    opacity: 1;
    transition: transform ease-in-out 0.2s, opacity ease-in-out 0.2s;
  }
  
  .bachar-stats-data-float-panel-closed{
    transform: scale(0);
    opacity: 0;
  }
  
  .bachar-stats-data-float-panel-head{
    margin-bottom: 35px;
  }
  
  .bachar-stats-data-float-panel-close{
    float: right;
    color: #2d4c72;
    line-height: 0;
    font-size: 60px;
    font-weight: 100;
    margin-top: 12px;
    cursor: pointer;
    transition: transform ease-in-out 0.2s;
  }
  
  .bachar-stats-float-panel-close:hover{
    transform: scale(0.95);
  }
  
  .bachar-stats-skill-container,
  .bachar-stats-skill-upgate {
    cursor: pointer;
    transition: transform ease-in-out 0.2s;
  }
  
  .mw-parser-output .Blue_Archive_Character_Template .bachar-stats-skill-container:hover,
  .mw-parser-output .Blue_Archive_Character_Template .bachar-stats-skill-upgate:hover {
    transform: scale(0.95) skew(-10deg);
  }
  
  .bachar-stats-skill {
    position: relative;
  }
  
  .bachar-stats-skill-detail {
    position: absolute;
    z-index: 10;
    background: white;
    border: solid #00ffff 1px;
    border-radius: 5px;
    padding: 5px;
    bottom: 100px;
    left: 25px;
    width: 440px;
    box-shadow: 0px 0px 10px 2px #333333;
  }
  
  .bachar-stats-skill-detail::after {
    content: "";
    position: absolute;
    z-index: 15;
    height: 0px;
    width: 0px;
    border: solid transparent;
    border-top-color: #00ffff;
    border-width: 15px 9px;
    bottom: -25px;
  }
  
  .bachar-stats-skill-detail-ex::after {
    left: 35px;
  }
  
  .bachar-stats-skill-detail-basic::after {
    left: 132px;
  }
  
  .bachar-stats-skill-detail-buff::after {
    left: 228px;
  }
  
  .bachar-stats-skill-detail-side::after {
    left: 326px;
  }
  
  .bachar-stats-skill-title {
    border-bottom: solid gray 2px;
    padding-left: 4px;
    padding-bottom: 3px;
    font-weight: bolder;
  }
  
  .bachar-stats-skill-title div {
    border-left: solid #00ffff 4px;
    padding-left: 6px;
  }
  
  .bachar-stats-skill-mid {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    border-bottom: dashed lightgray 1.5px;
  }
  
  .bachar-stats-skill-type {
    font-weight: bold;
    font-style: italic;
  }
  
  .bachar-stats-skill-cost::before {
    content: "／"
  }
  
  .bachar-stats-skill-flex-spacer {
    flex-grow: 1;
  }
  
  .bachar-stats-skill-level {
    font-weight: bold;
    color: orange;
  }
  
  .bachar-stats-skill-count {
    color: #00b7ff;
  }
  
  @media screen and (max-width: 900px){
    .skin-moeskin .mw-parser-output .Blue_Archive_Character_Template{
      max-width: none;
      max-height: none;
    }
    
    .skin-moeskin .mw-parser-output .Blue_Archive_Character_Template .bachar-container{
      max-width: none;
      max-height: none;
      width: 100%;
      grid-template-columns: 45% 10px 55%;
    }
  }
  
  @media screen and (max-width: 600px){
    .skin-moeskin .mw-parser-output .Blue_Archive_Character_Template{
      max-width: none;
      max-height: none;
    }
  
    .skin-moeskin .mw-parser-output .Blue_Archive_Character_Template .bachar-container{
      margin-left: -15px;
      max-width: none;
      max-height: none;
      width: 100%;
      grid-template-rows: 550px 200px 550px;
      grid-template-columns: 108%;
      grid-template-areas:
              "illust"
              "character"
              "stats";
    }
  }
  
`;

  async function sleep(time) {
    return new Promise(function (resolve) {
      setTimeout(resolve, time);
    });
  }

  const studentStatList = ["MaxHP", "AttackPower", "DefensePower", "HealPower", "AccuracyPoint", "DodgePoint", "CriticalPoint", "CriticalChanceResistPoint", "CriticalDamageRate", "CriticalDamageResistRate", "StabilityPoint", "Range", "OppressionPower", "OppressionResist", "HealEffectivenessRate", "AmmoCount", "AmmoCost",];

// From SchaleDB by lonqie
// https://lonqie.github.io/SchaleDB
// https://github.com/lonqie/SchaleDB/blob/main/js/common.js
  const starscale_hp = [1, 1.05, 1.12, 1.21, 1.35];
  const starscale_attack = [1, 1.1, 1.22, 1.36, 1.53];
  const starscale_healing = [1, 1.075, 1.175, 1.295, 1.445];
  const striker_bonus_coefficient = {MaxHP: 0.1, AttackPower: 0.1, DefensePower: 0.05, HealPower: 0.05};

  function recalculateStats($el, level, data, starGrade) {
    starGrade = starGrade ?? data.Rate;
    let studentStats = new CharacterStats(data, level, starGrade);

    studentStatList.forEach((statName) => {
      if (statName === "CriticalDamageRate") {
        $el.find(`.bachar-stats-CriticalDamageRate .bachar-stats-value`).text(`${studentStats.getTotal(statName) / 100}\%`);
      } else $el.find(`.bachar-stats-${statName} .bachar-stats-value`).text(studentStats.getTotal(statName));
    });
  }

  function handleModelData($ele) {
    let $data = $ele.find(".bachar-char-data");
    let data = JSON.parse($data.html());
    console.log(data);
    $data.remove();

    let $expLv = $ele.find(".bachar-char-explv");
    let $expBar = $("<input>")
      .addClass("bachar-char-expbar bachar-all-unitalic")
      .attr({
        type: "range", min: 1, max: 85, value: 1, step: 1,
      })
      .on("input", () => {
        $expLv.text($expBar.val());
        recalculateStats($ele, $expBar.val(), data);
      });
    $ele.find(".bachar-char-expbar").replaceWith($expBar);

    $expBar.trigger("input");
  }

  function handleFloatPanel($ele) {
    let $open = $ele.find(".bachar-stats-data-detail-button");
    let $panel = $ele.find(".bachar-stats-data-float-panel");
    let $close = $ele.find(".bachar-stats-data-float-panel-close");

    $open.on("click", async () => {
      $panel.css("display", "");
      await sleep(10);
      $panel.removeAttr("style").removeClass("bachar-stats-data-float-panel-closed");
    });

    $close.on("click", async () => {
      $panel.addClass("bachar-stats-data-float-panel-closed");
      await sleep(300);
      $panel.css("display", "none");
    });
  }

  function handleSkillPanel($ele) {

  }

  class CharacterStats {
    constructor(character, level = 1, stargrade) {
      if (!stargrade) stargrade = character.Rate;
      const levelscale = ((level - 1) / 99).toFixed(4);
      const MaxHP = Math.ceil((Math.round((character.MaxHP1 + (character.MaxHP100 - character.MaxHP1) * levelscale).toFixed(4)) * starscale_hp[stargrade - 1]).toFixed(4),);
      const AttackPower = Math.ceil((Math.round((character.AttackPower1 + (character.AttackPower100 - character.AttackPower1) * levelscale).toFixed(4)) * starscale_attack[stargrade - 1]).toFixed(4),);
      const DefensePower = Math.round((character.DefensePower1 + (character.DefensePower100 - character.DefensePower1) * levelscale).toFixed(4),);
      const HealPower = Math.ceil((Math.round((character.HealPower1 + (character.HealPower100 - character.HealPower1) * levelscale).toFixed(4)) * starscale_healing[stargrade - 1]).toFixed(4),);
      this.stats = {
        MaxHP: [MaxHP, 0, 1],
        AttackPower: [AttackPower, 0, 1],
        DefensePower: [DefensePower, 0, 1],
        HealPower: [HealPower, 0, 1],
        AccuracyPoint: [character.AccuracyPoint, 0, 1],
        DodgePoint: [character.DodgePoint, 0, 1],
        CriticalPoint: [character.CriticalPoint, 0, 1],
        CriticalDamageRate: [character.CriticalDamageRate, 0, 1],
        CriticalChanceResistPoint: [100, 0, 1],
        CriticalDamageResistRate: [5000, 0, 1],
        StabilityPoint: [character.StabilityPoint, 0, 1],
        AmmoCount: [character.AmmoCount, 0, 1],
        AmmoCost: [character.AmmoCost, 0, 1],
        Range: [character.Range, 0, 1],
        RegenCost: [character.RegenCost, 0, 1],
        HealEffectivenessRate: [10000, 0, 1],
        OppressionPower: [100, 0, 1],
        OppressionResist: [100, 0, 1],
        AttackSpeed: [10000, 0, 1],
        BlockRate: [0, 0, 1],
        DefensePenetration: [0, 0, 1],
        MoveSpeed: [10000, 0, 1],
      };
    }

    addBuff(stat, amount) {
      const stat_split = stat.split("_");
      if (stat_split.length > 1) {
        if (stat_split[1] === "Base") {
          this.stats[stat_split[0]][1] += amount;
        } else if (stat_split[1] === "Coefficient") {
          this.stats[stat_split[0]][2] += amount / 10000;
        }
      } else {
        this.stats[stat_split[0]][1] += amount;
      }
    }

    /**
     * Adds the specified stat from another instance of CharacterStats as a flat buff
     * @param {CharacterStats} chStats the instance of CharacterStats to add from
     * @param {*} stat the name of the stat to add
     * @param {*} coefficient the amount of the stat to add
     */
    addCharacterStatsAsBuff(chStats, stat, coefficient) {
      this.stats[stat][1] += Math.round(chStats.getTotal(stat) * (coefficient / 10000));
    }

    /**
     * Calculates the final total of a stat with all flat and percentage buffs
     * @param {string} stat The name of the stat
     * @returns
     */
    getTotal(stat) {
      return Math.round(((this.stats[stat][0] + this.stats[stat][1]) * this.stats[stat][2]).toFixed(4));
    }

    /**
     * Calculates and returns the final total of a stat as a locale-formatted string
     * @param {*} stat
     * @returns
     */
    getTotalString(stat) {
      const total = this.getTotal(stat);
      if (CharacterStats.isRateStat(stat)) {
        return `${(total / 100).toFixed(0).toLocaleString()}%`;
      }
      return total.toLocaleString();
    }

    /**
     * Returns the base stat as a locale-formatted string
     * @param {*} stat
     * @returns
     */
    getBaseString(stat) {
      const total = this.stats[stat][0];
      if (CharacterStats.isRateStat(stat)) {
        return `${(total / 100).toFixed(0).toLocaleString()}%`;
      }
      return total.toLocaleString();
    }

    /**
     * Returns the flat buff as a locale-formatted string
     * @param {*} stat
     * @returns
     */
    getFlatString(stat) {
      return `+${this.stats[stat][1].toLocaleString()}`;
    }

    /**
     * Returns the coefficient percent buff as a locale-formatted string
     * @param {*} stat
     * @returns
     */
    getCoefficientString(stat) {
      return `+${parseFloat(((this.stats[stat][2] - 1) * 100).toFixed(1)).toLocaleString()}%`;
    }

    getStrikerBonus(stat) {
      return Math.floor(((this.stats[stat][0] + this.stats[stat][1]) * this.stats[stat][2]).toFixed(4) * striker_bonus_coefficient[stat]);
    }

    getStabilityMinDamage() {
      const stability = this.getTotal("StabilityPoint");
      return `${parseFloat(((stability / (stability + 997) + 0.2) * 100).toFixed(2))}%`;
    }

    static isRateStat(stat) {
      return stat.slice(-4) === "Rate" || stat.startsWith("AttackSpeed");
    }
  }

  window.RLQ = window.RLQ || [];

  window.RLQ.push(async () => {

    $("head").append($("<style>").html(CSS_ADD).attr("id", "bachar-style"));

    $(".bachar-container").each(async (_, ele) => {
      let $ele = $(ele);
      handleModelData($ele);
      handleFloatPanel($ele);
      handleSkillPanel($ele);
    });

  });


})();
