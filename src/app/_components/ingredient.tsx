import React from "react";
import WarningAmberRoundedIcon from "@mui/icons-material/WarningAmberRounded";

type IngredientProps = {
	ingredient: string;
	flag: boolean; // Indicates if the ingredient is potentially harmful
};

const IngredientList: React.FC<IngredientProps> = ({ ingredient, flag }) => {
	return (
		<div>
			<li style={{ color: flag ? "red" : "inherit" }}>
				{ingredient}
				{flag && <WarningAmberRoundedIcon style={{ marginLeft: "4px" }} />}
			</li>
		</div>
	);
};

export default IngredientList;
