import React from "react";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

type IngredientProps = {
	ingredient: string;
	flag: boolean; // Indicates if the ingredient is potentially harmful
	unknown?: boolean; // Indicates if the ingredient is unknown
};

const IngredientList: React.FC<IngredientProps> = ({ ingredient, flag, unknown }) => {
	return (
		<div>
			<li style={{ color: flag ? "red" : unknown ? "yellow" : "inherit" }}>
				{ingredient}
				{(flag || unknown) && <WarningAmberRoundedIcon style={{ marginLeft: "4px", color: unknown ? "yellow" : "red" }} />}
			</li>
		</div>
	);
};

export default IngredientList;
	