function calc(){
	var stack = new Array(48), s1 = true, s2 = true, s3 = true, s4 = true, s5 = true, s6 = true, s7 = true, s1_cnt = 0;
	for(var i = 0; i < 48; i++){
		stack[i] = cubic.fetch(i)>>>0;
		//str += '<br />' + i + ': ' + stack[i] + ': ' + (stack[i]>>>5&7) + ', ' + (stack[i]>>>2&7) + ', ' + (stack[i]&3) + ' (на ' + ((stack[i]>>>2&56)+(((stack[i]>>>2&7)+((stack[i]&3)<<1))&7)) + ')';
	}

	for(i of [9, 11, 13, 15]){
		s1 = s1 && ((stack[i]>>>5&7) === 1);
	}

	for(i of [9, 11, 13, 15, 23, 31, 33, 45]){
		s2 = s2 && ((stack[i]>>>5&7) === (i>>>3&7) && (stack[i]>>>2&7) === (i&7) && (stack[i]&3) === 0);
	}

	for(i of [8, 10, 12, 14, 16, 22, 24, 30, 32, 34, 44, 46]){
		s3 = s3 && ((stack[i]>>>5&7) === (i>>>3&7) && (stack[i]>>>2&7) === (i&7) && (stack[i]&3) === 0);
	}

	for(i of [17, 21, 25, 29, 35, 39, 43, 47]){
		s4 = s4 && ((stack[i]>>>5&7) === (i>>>3&7) && (stack[i]>>>2&7) === (i&7) && (stack[i]&3) === 0);
	}

	s5 = s5 && (stack[19] === 76 || stack[19] === 14);
	s5 = s5 && (stack[27] === 108 || stack[27] === 12);
	s5 = s5 && (stack[37] === 148 || stack[37] === 22);
	s5 = s5 && (stack[41] === 164 || stack[41] === 6);

	for(i of [1, 3, 5, 7]){
		s6 = s6 && ((stack[i]>>>5&7) === (i>>>3&7));
	}

	if(!progress){
		if(!s1){

			//с зада - повернуть дважды, если нужно, повернуть заднюю сторону
			if(stack[ 9] ===  4) persperctive_cube = [0, 0, 5, 5];
			if(stack[ 9] ===  5) persperctive_cube = [0, 5, 5];
			if(stack[ 9] ===  6) persperctive_cube = [5, 5];
			if(stack[ 9] ===  7) persperctive_cube = [8, 5, 5];

			if(stack[11] === 12) persperctive_cube = [3, 3];
			if(stack[11] === 13) persperctive_cube = [8, 3, 3];
			if(stack[11] === 14) persperctive_cube = [8, 8, 3, 3];
			if(stack[11] === 15) persperctive_cube = [0, 3, 3];

			if(stack[13] === 20) persperctive_cube = [0, 0, 4, 4];
			if(stack[13] === 21) persperctive_cube = [0, 4, 4];
			if(stack[13] === 22) persperctive_cube = [4, 4];
			if(stack[13] === 23) persperctive_cube = [8, 4, 4];

			if(stack[15] === 28) persperctive_cube = [2, 2];
			if(stack[15] === 29) persperctive_cube = [8, 2, 2];
			if(stack[15] === 30) persperctive_cube = [8, 8, 2, 2];
			if(stack[15] === 31) persperctive_cube = [0, 2, 2];

			//сбоку - просто повернуть
			if(stack[ 9] ===  70) persperctive_cube = [13];
			if(stack[ 9] === 100) persperctive_cube = [ 5];
			if(stack[11] === 140) persperctive_cube = [ 3];
			if(stack[11] === 172) persperctive_cube = [11];
			if(stack[13] ===  86) persperctive_cube = [ 4];
			if(stack[13] === 116) persperctive_cube = [12];
			if(stack[15] === 156) persperctive_cube = [10];
			if(stack[15] === 188) persperctive_cube = [ 2];

			//0 - З, 1 - Ф, 2 - Л, 3 - П, 4 - Н, 5 - В
			//8 - З', 9 - Ф', 10 - Л', 11 - П', 12 - Н', 13 - В'
			//сбоку, но повернутый во фронтальную сторону - значит на фронтальной стороне ничего нет - поворачиваем
			if(stack[ 9] ===  71) persperctive_cube = [10, 13];
			if(stack[ 9] === 103) persperctive_cube = [ 3,  5];

			if(stack[11] === 173) persperctive_cube = [13, 11];
			if(stack[11] === 143) persperctive_cube = [ 4,  3];

			if(stack[13] ===  85) persperctive_cube = [ 2,  4];
			if(stack[13] === 117) persperctive_cube = [11, 12];

			if(stack[15] === 157) persperctive_cube = [12, 10];
			if(stack[15] === 191) persperctive_cube = [ 5,  2];

			//сделать с другого бока этих сторон и в отдалении
			/*if(stack[ 9] ===  68) persperctive_cube = [1, 1, 4, 9, 9];
			if(stack[ 9] ===  69) persperctive_cube = [2, 5, 10];

			if(stack[ 9] === 101) persperctive_cube = [3, 5, 11];
			if(stack[ 9] === 102) persperctive_cube = [1, 1, 12, 9, 9];

			if(stack[11] === 141) persperctive_cube = [12, 3, 4];
			if(stack[11] === 142) persperctive_cube = [1, 1, 10, 9, 9]

			if(stack[11] === 174) persperctive_cube = [1, 1, 2, 9, 9];
			if(stack[11] === 175) persperctive_cube = [5, 11, 13];

			if(stack[13] ===  84) persperctive_cube = [1, 1, 4, 9, 9];
			if(stack[13] ===  87) persperctive_cube = [2, 4, 10];

			if(stack[13] === 118) persperctive_cube = [3, 4, 11];
			if(stack[13] === 119) persperctive_cube = [1, 1, 12, 9, 9];

			if(stack[15] === 158) persperctive_cube = [4, 2, 10];
			if(stack[15] === 159) persperctive_cube = [1, 1, 12, 9, 9];

			if(stack[15] === 189) persperctive_cube = [1, 1, 12, 9, 9];
			if(stack[15] === 190) persperctive_cube = [5, 2, 13];*/

			//с той стороны, на которой квадрат расположен и на противоположной от нее так,
			//что при повороте фронтальной стороны выполнем поворот и разворачиваем обратно
			if(stack[ 9] === 133) persperctive_cube = [1,  3, 9];
			if(stack[ 9] === 135) persperctive_cube = [9, 10, 1];
			if(stack[ 9] === 165) persperctive_cube = [1, 11, 9];
			if(stack[ 9] === 167) persperctive_cube = [9,  2, 1];

			if(stack[11] ===  77) persperctive_cube = [9, 13, 1];
			if(stack[11] ===  79) persperctive_cube = [1,  4, 9];
			if(stack[11] === 109) persperctive_cube = [1, 12, 1];
			if(stack[11] === 111) persperctive_cube = [9,  5, 1];

			if(stack[13] === 149) persperctive_cube = [9, 10, 1];
			if(stack[13] === 151) persperctive_cube = [9,  3, 1];
			if(stack[13] === 181) persperctive_cube = [1,  2, 9];
			if(stack[13] === 183) persperctive_cube = [9, 11, 1];

			if(stack[15] ===  93) persperctive_cube = [9,  4, 1];
			if(stack[15] ===  95) persperctive_cube = [1, 13, 9];
			if(stack[15] === 125) persperctive_cube = [1,  5, 9];
			if(stack[15] === 127) persperctive_cube = [9, 12, 1];
			//еще бы сделать по бокам этих сторон и в отдалении
		}
		if(s1){
			s1_cnt = 4;
			if(stack[45] === 180) s1_cnt--;
			if(stack[31] === 124) s1_cnt--;
			if(stack[33] === 132) s1_cnt--;
			if(stack[23] === 92) s1_cnt--;
			if(s1_cnt > 2) {
				str += '<br />Покрутите нижнее основание';
				persperctive_cube = [1];
			}
			else if(s1_cnt > 0){
				str += '<br />Приступаем к подмене';
				if(stack[45] === 117 && stack[31] === 191) { str += "<br />поменяйте В''З'П''ЗВ'' либо П''ЗВ''З'П''"; persperctive_cube = [/*[*/5, 5, 8, 3, 3, 0, 5, 5/*], [3, 3, 0, 5, 5, 8, 3, 3]*/]; }
				if(stack[31] === 157 && stack[33] === 103) { str += "<br />поменяйте П''З'Н''ЗП'' либо Н''ЗП''З'Н''"; persperctive_cube = [/*[*/3, 3, 8, 4, 4, 0, 3, 3/*], [4, 4, 0, 3, 3, 8, 4, 4]*/]; }
				if(stack[33] ===  71 && stack[23] === 157) { str += "<br />поменяйте Н''З'Л''ЗН'' либо Л''ЗН''З'Л''"; persperctive_cube = [/*[*/4, 4, 8, 2, 2, 0, 4, 4/*], [2, 2, 0, 4, 4, 8, 2, 2]*/]; }
				if(stack[23] === 191 && stack[45] ===  85) { str += "<br /> поменяйте Л''З'В''ЗЛ'' либо В''ЗЛ''З'В''"; persperctive_cube = [/*[*/2, 2, 8, 5, 5, 0, 2, 2/*], [5, 5, 0, 2, 2, 8, 5, 5]*/]; }
				if(stack[23] === 124 && stack[31] ===  92) { str += "<br /> поменяйте П''Л''З''П''Л''";  persperctive_cube = [/*[*/3, 3, 2, 2, 0, 0, 3, 3, 2, 2/*]*/]; }
				if(stack[33] === 166 && stack[45] === 150) { str += "<br />поменяйте В''Н''З''В''Н''";  persperctive_cube = [/*[*/5, 5, 4, 4, 0, 0, 5, 5, 4, 4/*]*/]; }
			}
		}
		if(s1 && s2){
			//если сверху есть красный
			if((stack[10]>>>5&7) === 3 && (stack[44]>>>5&7) === 5 && (stack[24]>>>5&7) === 0) { str += "<br />поменяйте ПЗП'"; persperctive_cube = [3, 0, 11]; }
			else if((stack[10]>>>5&7) === 5 && (stack[44]>>>5&7) === 0 && (stack[24]>>>5&7) === 3) { str += "<br />поменяйте В'З'В"; persperctive_cube = [13, 8, 5]; }
			else if((stack[10]>>>5&7) === 0 && (stack[44]>>>5&7) === 3 && (stack[24]>>>5&7) === 5) { str += "<br />поменяйте ПЗ'П'З''ПЗП'"; persperctive_cube = [3, 8, 11, 0, 0, 3, 0, 11]; }

			else if((stack[12]>>>5&7) === 4 && (stack[30]>>>5&7) === 3 && (stack[34]>>>5&7) === 0) { str += "<br />Поменяйте НЗН'"; persperctive_cube = [4, 0, 12]; }
			else if((stack[12]>>>5&7) === 3 && (stack[30]>>>5&7) === 0 && (stack[34]>>>5&7) === 4) { str += "<br />Поменяйте П'З'П"; persperctive_cube = [11, 8, 3]; }
			else if((stack[12]>>>5&7) === 0 && (stack[30]>>>5&7) === 4 && (stack[34]>>>5&7) === 3) { str += "<br />Поменяйте НЗ'Н'З''НЗН'"; persperctive_cube = [4, 8, 12, 0, 0, 4, 0, 12]; }

			else if((stack[14]>>>5&7) === 2 && (stack[32]>>>5&7) === 4 && (stack[16]>>>5&7) === 0) { str += "<br />Поменяйте ЛЗЛ'"; persperctive_cube = [2, 0, 10]; }
			else if((stack[14]>>>5&7) === 4 && (stack[32]>>>5&7) === 0 && (stack[16]>>>5&7) === 2) { str += "<br />Поменяйте Н'З'Н"; persperctive_cube = [12, 8, 4]; }
			else if((stack[14]>>>5&7) === 0 && (stack[32]>>>5&7) === 2 && (stack[16]>>>5&7) === 4) { str += "<br />Поменяйте ЛЗ'Л'З''ЛЗЛ'"; persperctive_cube = [2, 8, 10, 0, 0, 2, 0, 10]; }

			else if((stack[8]>>>5&7) === 5 && (stack[22]>>>5&7) === 2 && (stack[46]>>>5&7) === 0) { str += "<br />Поменяйте ВЗВ'"; persperctive_cube = [5, 0, 13]; }
			else if((stack[8]>>>5&7) === 2 && (stack[22]>>>5&7) === 0 && (stack[46]>>>5&7) === 5) { str += "<br />Поменяйте Л'З'Л"; persperctive_cube = [10, 8, 2]; }
			else if((stack[8]>>>5&7) === 0 && (stack[22]>>>5&7) === 5 && (stack[46]>>>5&7) === 2) { str += "<br />Поменяйте ВЗ'В'З''ВЗВ'"; persperctive_cube = [5, 8, 13, 0, 0, 5, 0, 13]; }
			//else if(((stack[8]>>>2&56)+(((stack[8]>>>2&7)+((stack[8]&3)<<1))&7)) === )
			else if(!s3) { str += "<br />Покрутите верхнее основание"; persperctive_cube = [0]; };

			//если сверху нет красного, то найти красный в нижнем основании и вызволить его

		}
		if(s1 && s2 && s3){
				 if((stack[43]>>>5&7) === 5 && (stack[25]>>>5&7) === 0) { str += "<br />Поменяйте ЗПЗ'П'З'В'ЗВ"; persperctive_cube = [0, 3, 8, 11, 8, 13, 0, 5]; }
			else if((stack[29]>>>5&7) === 3 && (stack[35]>>>5&7) === 0) { str += "<br />Поменяйте ЗНЗ'Н'З'П'ЗП"; persperctive_cube = [0, 4, 8, 12, 8, 11, 0, 3]; }
			else if((stack[39]>>>5&7) === 4 && (stack[17]>>>5&7) === 0) { str += "<br />Поменяйте ЗЛЗ'Л'З'Н'ЗН"; persperctive_cube = [0, 2, 8, 10, 8, 12, 0, 4]; }
			else if((stack[21]>>>5&7) === 2 && (stack[47]>>>5&7) === 0) { str += "<br />Поменяйте ЗВЗ'В'З'Л'ЗЛ"; persperctive_cube = [0, 5, 8, 13, 8, 10, 0, 2]; }

			else if((stack[47]>>>5&7) === 5 && (stack[21]>>>5&7) === 0) { str += "<br />Поменяйте З'Л'ЗЛЗВЗ'В'"; persperctive_cube = [8, 10, 0, 2, 0, 5, 8, 13]; }
			else if((stack[25]>>>5&7) === 3 && (stack[43]>>>5&7) === 0) { str += "<br />Поменяйте З'В'ЗВЗПЗ'П'"; persperctive_cube = [8, 13, 0, 5, 0, 3, 8, 11]; }
			else if((stack[35]>>>5&7) === 4 && (stack[29]>>>5&7) === 0) { str += "<br />Поменяйте З'П'ЗПЗНЗ'Н'"; persperctive_cube = [8, 11, 0, 3, 0, 4, 8, 12]; }
			else if((stack[17]>>>5&7) === 2 && (stack[39]>>>5&7) === 0) { str += "<br />Поменяйте З'Н'ЗНЗЛЗ'Л'"; persperctive_cube = [8, 12, 0, 4, 0, 2, 8, 10]; }

			else if((stack[47]>>>5&7) === 2 && (stack[21]>>>5&7) === 5) { str += "<br />Поменяйте ВЗ'В'З'Л'ЗЛЗ'ВЗ'В'З'Л'ЗЛ'"; persperctive_cube = [5, 8, 13, 8, 10, 0, 2, 8, 5, 8, 13, 8, 10, 0, 2]; }
			else if((stack[25]>>>5&7) === 5 && (stack[43]>>>5&7) === 3) { str += "<br />Поменяйте ПЗ'П'З'В'ЗВЗ'ПЗ'П'З'В'ЗВ";  persperctive_cube = [3, 8, 11, 8, 13, 0, 5, 8, 3, 8, 11, 8, 13, 0, 5]; }
			else if((stack[35]>>>5&7) === 3 && (stack[29]>>>5&7) === 4) { str += "<br />Поменяйте НЗ'Н'З'П'ЗПЗ'НЗ'Н'З'П'ЗП";  persperctive_cube = [4, 8, 12, 8, 11, 0, 3, 8, 4, 8, 12, 8, 11, 0, 3]; }
			else if((stack[17]>>>5&7) === 4 && (stack[39]>>>5&7) === 2) { str += "<br />Поменяйте ЛЗ'Л'З'Н'ЗНЗ'ЛЗ'Л'З'Н'ЗН'"; persperctive_cube = [2, 8, 10, 8, 12, 0, 4, 8, 2, 8, 10, 8, 12, 0, 4]; }
			//иногда надо вызволить кубики из нижнего сектора - тогда проделать обратную операцию
			else if(!s4) { str += "<br />Покрутите верхнее основание"; persperctive_cube = [0]; }
		}
		if(s1 && s2 && s3 && s4){
				 if((stack[19] === 175 || stack[19] === 13) && (stack[41] ===  69 || stack[41] ===  7)) { str += "<br />Поменяйте ЗН'З''НЗН'ЗН"; persperctive_cube = [0, 12, 0, 0, 4, 0, 12, 0, 4]; }
			else if((stack[41] === 101 || stack[41] ===  5) && (stack[27] === 175 || stack[27] === 12)) { str += "<br />Поменяйте ЗЛ'З''ЛЗЛ'ЗЛ"; persperctive_cube = [0, 10, 0, 0, 2, 0, 10, 0, 2]; }
			else if((stack[27] === 141 || stack[27] === 15) && (stack[37] === 119 || stack[37] === 23)) { str += "<br />Поменяйте ЗВ'З''ВЗВ'ЗВ"; persperctive_cube = [0, 13, 0, 0, 5, 0, 13, 0, 5]; }
			else if((stack[37] ===  87 || stack[37] === 21) && (stack[19] === 141 || stack[19] === 15)) { str += "<br />Поменяйте ЗП'З''ПЗП'ЗП"; persperctive_cube = [0, 11, 0, 0, 3, 0, 11, 0, 3]; }
			else if(!s5){ str += "<br />Покрутите верхнее основание"; persperctive_cube = [0]; }
		}

		if(s1 && s2 && s3 && s4 && s5){
			//0 - З, 1 - Ф, 2 - Л, 3 - П, 4 - Н, 5 - В
			//8 - З', 9 - Ф', 10 - Л', 11 - П', 12 - Н', 13 - В'
				 if(stack[19] === 14 && stack[41] ===  6) { str += "<br />Поменяйте ЛЗФ'НЗФ'ПЗФ'ВЗФ'ЗЛЗФ'НЗФ'ПЗФ'ВЗФ'"; persperctive_cube = [2, 0, 9, 4, 0, 9, 3, 0, 9, 5, 0, 9, 0, 2, 0, 9, 4, 0, 9, 3, 0, 9, 5, 0, 9]; }
			else if(stack[41] ===  5 && stack[27] === 12) { str += "<br />Поменяйте ВЗФ'ЛЗФ'НЗФ'ПЗФ'ЗВЗФ'ЛЗФ'НЗФ'ПЗФ'"; persperctive_cube = [5, 0, 9, 2, 0, 9, 4, 0, 9, 3, 0, 9, 0, 5, 0, 9, 2, 0, 9, 4, 0, 9, 3, 0, 9]; }
			else if(stack[27] === 12 && stack[37] === 22) { str += "<br />Поменяйте ПЗФ'ВЗФ'ЛЗФ'НЗФ'ЗПЗФ'ВЗФ'ЛЗФ'НЗФ'"; persperctive_cube = [3, 0, 9, 5, 0, 9, 2, 0, 9, 4, 0, 9, 0, 3, 0, 9, 5, 0, 9, 2, 0, 9, 4, 0, 9]; }
			else if(stack[37] === 21 && stack[19] === 15) { str += "<br />Поменяйте НЗФ'ПЗФ'ВЗФ'ЛЗФ'ЗНЗФ'ПЗФ'ВЗФ'ЛЗФ'"; persperctive_cube = [4, 0, 9, 3, 0, 9, 5, 0, 9, 2, 0, 9, 0, 4, 0, 9, 3, 0, 9, 5, 0, 9, 2, 0, 9]; }
			else if(!s6){ str += "<br />Поменяйте НЗФ'ПЗФ'ВЗФ'ЛЗФ'ЗНЗФ'ПЗФ'ВЗФ'ЛЗФ'"; persperctive_cube = [4, 0, 9, 3, 0, 9, 5, 0, 9, 2, 0, 9, 0, 4, 0, 9, 3, 0, 9, 5, 0, 9, 2, 0, 9]; }
		}

		if(s1 && s2 && s3 && s4 && s5 && s6){
			//0 - З, 1 - Ф, 2 - Л, 3 - П, 4 - Н, 5 - В
			//8 - З', 9 - Ф', 10 - Л', 11 - П', 12 - Н', 13 - В'
			//str += "<br />Поменяйте П'Ф'Л'ФПФ'ЛФ"; persperctive_cube = [11, 9, 10, 1, 3, 9, 2, 1];
		}

		if(!!persperctive_cube && !!persperctive_cube.length)
		for(var i of persperctive_cube){
			history_table.rows[0].insertAdjacentHTML('beforeend', '<td class="expected">' + dic.side2[i&7] + (i&8 ? '\'' : '') + '</td>');
			history_table.rows[0].lastElementChild.onclick = history_cube_element_click;
		}
	}

	s2 &= s1; s3 &= s2; s4 &= s3; s5 &= s4; s6 &= s5; s7 &= s6;

	if(!s1) str += '<br />Соберите крест';
	if(s1) str += '<br />Первая стадия пройдена';
	if(s2) str += '<br />Вторая стадия пройдена';
	if(s3) str += '<br />Третья стадия пройдена';
	if(s4) str += '<br />Четвертая стадия пройдена';
	if(s5) str += '<br />Пятая стадия пройдена';
	if(s6) str += '<br />Шестая стадия пройдена';
	if(s7) str += '<br />Седьмая стадия пройдена';

}
