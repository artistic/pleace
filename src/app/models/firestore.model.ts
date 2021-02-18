export default class Clubs {
	facilityID?: string;
	club_name?: string;
	club_membership?: string;
	holes?: string;
	address?: string;
	city?: string;
	state?: string;
	country?: string;
	continent?: string;	
	postal_code	?: string;
	phone?: string;
	fax?: string;
	website?: string;
	longitude?: string;
	latitude?: string;
	contact_name?: string;
	contact_title?: string;
	email?: string;
	driving_range?: boolean;
	putting_green?: boolean;
	chipping_green?: boolean;
	practice_bunker?: boolean;
	motor_cart?: boolean;
	pull_cart?: boolean;
	golf_club_rentals?: boolean;	
	club_fitting?: boolean;
	pro_shop?: boolean;
	golf_lessons?: boolean;
	caddie_hire	?: boolean;
	restaurant?: boolean;
	reception_hall?: boolean;
	changing_room?: boolean;
	lockers?: boolean;
	lodging_on_site?: boolean;


}

export class Courses {
	courseID?: string;	
	facilityID?: string;	
	course_name?: string;	
	holes?: string;	
	par?: string;	
	course_type	?: string;
	course_architect?: string;	
	open_date?: string;	
	guest_policy?: string;	
	weekday_price?: string;	
	weekend_price?: string;	
	twilight_price?: string;	
	fairway?: string;	
	green?: string;	
	currency?: string;
}

export class Tees {
	teeID?: string;
	courseID?: string;
	tee_name?: string;
	tee_color?: string;
	course_par_for_tee?: string;
	rating?: string;
	slope?: string;
	hole1?: number;
	hole2?: number;
	hole3?: number;
	hole4?: number;
	hole5?: number;
	hole6?: number;
	hole7?: number;
	hole8?: number;
	hole9?: number;
	hole10?: number;
	hole11?: number;
	hole12?: number;
	hole13?: number;
	hole14?: number;
	hole15?: number;
	hole16?: number;
	hole17?: number;
	hole18?: number;
	total_distance?: number;
	hole1_par?: number;
	hole2_par?: number;
	hole3_par?: number;
	hole4_par?: number;
	hole5_par?: number;
	hole6_par?: number;
	hole7_par?: number;
	hole8_par?: number;
	hole9_par?: number;
	hole10_par?: number;
	hole11_par?: number;
	hole12_par?: number;
	hole13_par?: number;
	hole14_par?: number;
	hole15_par?: number;
	hole16_par?: number;
	hole17_par?: number;
	hole18_par?: number;
	hole1_handicap?: number;
	hole2_handicap?: number;
	hole3_handicap?: number;
	hole4_handicap?: number;
	hole5_handicap?: number;
	hole6_handicap?: number;
	hole7_handicap?: number;
	hole8_handicap?: number;
	hole9_handicap?: number;
	hole10_handicap?: number;
	hole11_handicap?: number;
	hole12_handicap?: number;
	hole13_handicap?: number;
	hole14_handicap?: number;
	hole15_handicap?: number;
	hole16_handicap?: number;
	hole17_handicap?: number;
	hole18_handicap?: number;
}

export class Tournaments {
	tournamentID?: string;	
	faciltyID?: string;	
	courseID?: string;	
	teeID?: string;	
	tournament_name?: string;	
	tournament_image?: string;	
	tournament_descripition?: string;	
	tournament_category?: string;	
	tournament_players?: string;	
}



