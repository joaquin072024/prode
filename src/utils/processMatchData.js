

import { ServicioEquipos } from "../services/equipos";
import { ServicioPartidos } from "../services/partidos";

export const processMatchData = async () => {
  try {
    const equipos = await ServicioEquipos();
    const partidos = await ServicioPartidos();

    if (!equipos || !partidos) {
      console.error("No equipos or partidos data found");
      return [];
    }

    const processedData = partidos.map(match => {
      const localScoreObj = match.score.find(s => s.side === "local");
      const visitorScoreObj = match.score.find(s => s.side === "visitor");

      if (!localScoreObj || !visitorScoreObj) {
        console.error("Score data missing for match:", match.id);
        return null;
      }

      const localScore = localScoreObj.goals;
      const visitorScore = visitorScoreObj.goals;

      const localTeam = equipos.find(team => team.id === localScoreObj.team);
      const visitorTeam = equipos.find(team => team.id === visitorScoreObj.team);

      let result;
      if (localScore > visitorScore) {
        result = "local";
      } else if (localScore < visitorScore) {
        result = "visitor";
      } else {
        result = "draw";
      }

      return {
        matchId: match.id,
        localTeam: localTeam ? localTeam.name : "Unknown",
        visitorTeam: visitorTeam ? visitorTeam.name : "Unknown",
        localScore,
        visitorScore,
        result,
        penalties: match.penalties || null,
      };
    }).filter(match => match !== null); // Filter out null values

    return processedData;
  } catch (error) {
    console.error("Error processing match data:", error);
    return [];
  }
};

// Call the function and log the result
processMatchData().then(data => console.log(data));
