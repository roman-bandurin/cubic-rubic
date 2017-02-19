var cubic = (function (stdlib, env, heap) {
	"use asm";
	var ram = new stdlib.Uint8Array(heap);

	//ключ: 000 - цвет стороны и 000 квадрат этой стороны
	//значение: 000 - сторона, 000 - квадрат, 00 - вращение квадрата
	function init(){
		var i = 0;
		i = 0x30;
		while(i){
			i = (i - 1)>>>0;
			ram[i] = i << 2;
		}
	}

	//функция обнаружила, что за сторону вращать ('задняя', 'фронтальная', 'левая', 'правая', 'нижняя', 'верхняя')
	//+ старший бит стороны вращения (0 - по часовой стрелке, 1 - против)
	//значение из ram: 000 - сторона, 000 - квадрат, 00 - вращение квадрата
	function get_side(quad, dir) {
		quad = quad|0;
		dir = dir|0;

		var d1 = 0,	d0 = 0,
		s2 = 0, s1 = 0,	s0 = 0,
		q2 = 0,	q1 = 0,	q0 = 0,
		need = 0, spin = 0, side = 0;

		quad = quad>>>0;
		quad = ram[quad]>>>0;
		spin = quad&3;
		side = quad>>>5&7;
		quad = quad>>>2&7;

		q2 = quad>>>2&1;
		q1 = quad>>>1&1;
		q0 = quad&1;

		d1 = dir>>>1&1;
		d0 = dir&1;

		//нужно ли обрабатывать клик и поворачивать сторону
		need = (q2 ^ d1 ^ d0 ^ (q1 & d0) ^ 1) & ~q0 & 1;

		spin = (spin & 3)>>>0;
		quad = (quad + (spin << 1) & 7)>>>0;
		dir = (dir + spin & 3)>>>0;

		q2 = quad>>>2&1;
		q1 = quad>>>1&1;
		q0 = quad&1;

		d1 = dir>>>1&1;
		d0 = dir&1;

		//обновляем значения
		spin = (~q2|d1) & (q2|~d1) & (~q1|d0) & (q1|~d0) & 1;

		dir = (~q2|d1) & (q2|~d1) & ~d0 & 1 | ((~q2|d1|d0) & (q2|~d1) & (q2|~d0) & (~q1|d1) & (q1|~d1) & 1)<<1;

		d1 = dir>>>1&1;
		d0 = dir&1;

		s2 = side>>>2&1;
		s1 = side>>>1&1;
		s0 = side&1;

		//преобразования
		spin = (spin & need) << 3;
		need = ~(need | need<<1 | need<<2) & 7;

		//по данной стороне определяем сторону, которую нужно вращать
		side = d1 ^ d0 ^ s2 ^ s0 ^ d0&s2 ^ d0&s1 ^ d0&s0 | (~s1&d0&1)<<1 | (~s2&~d0&1)<<2 | need | spin;

		return side|0;
	}

	//по стороне вращения надо найти, какие кубики вращать
	//сторона для поворота будет известна, по ней вращаем центральный кубик
	//первые восемь квадратов - для вращения, остальные 12 - для перемещения
	function rotate(side, is_rot){
		//дана сторона
		side = side|0;
		is_rot = is_rot|0;

		var cur_ram = 0, i = 0, j = 0, k = 0,
		cur_side = 0, cs2 = 0, cs1 = 0, cs0 = 0,
		cur_quad = 0, cq2 = 0, cq1 = 0, cq0 = 0,
		spin = 0, s2 = 0, s1 = 0, s0 = 0,
		cur_dir = 0, cd1 = 0, cd0 = 0,
		cur_rot = 0, cr1 = 0, cr0 = 0;

		spin = side>>>3&1;
		side = side & 7;
		is_rot = is_rot&1;

		s2 = side>>>2&1;
		s1 = side>>>1&1;
		s0 = side&1;

		//для каждого квадрата стороны
		//значение из ram: 000 - сторона, 000 - квадрат, 00 - вращение квадрата
		i = 0x30; j = j>>>0; k = k>>>0;
		while(i){
			i = (i - 1)>>>0;
			cur_ram = ram[i]>>>0;

			cur_side = cur_ram>>>5;

			//найти квадраты стороны - поместить в начало
			if((side|0) == (cur_side|0)){

				if(is_rot) ram[i] = cur_ram & 252 | (cur_ram + (spin<<1|1) & 3);
				ram[j + 0x30|0] = i;
				j = (j + 1)|0;

			//найти для стороны сверху квадраты, которые надо выделить - поместить в конец (000 - сторона, 00 - квадраты для выделения)
			} else if(side&6 ^ cur_side&6){

				cs2 = cur_side>>>2&1;
				cs1 = cur_side>>>1&1;
				cs0 = cur_side&1;

				//получаем квадрат
				cur_quad = cur_ram>>>2&7;

				cq2 = cur_quad>>>2&1;
				cq1 = cur_quad>>>1&1;
				cq0 = cur_quad&1;

				//получаем угол поворота
				cur_rot = cur_ram&3;

				cr1 = cur_rot>>>1&1;
				cr0 = cur_rot&1;

				//определение направления, в котором данная сторона находится по отношению к поворачиваемой
				cd1 = ~(cs2&cs1) & ~(cs2&cs0&s0) & (~cs2|cs0|s0) & (cs2|cs1|s2|s1) & (cs2|cs0|~s1) & ~(cs1&cs0) & (cs1|cs0|~s2|~s0) & ~(cs0&s2&~s0) & ~(s2&s1) & 1;
				cd0 = ~cs2 & ~(cs1&s1) & (cs1|s1) & (cs1|s2^1) & 1;

				cur_dir = cd0 | cd1<<1;

				//определение истинного положения квадрата
				cur_quad = cq0 | (cq1 ^ cr0)<<1 | (cq1&cr0 ^ cq2 ^ cr1)<<2;

				//разложение истинного положения квадрата
				cq2 = cur_quad>>>2&1;
				cq1 = cur_quad>>>1&1;
				cq0 = cur_quad&1;

				//определение квадратов для выделения
				cr1 = ~(s2&s1) & ~(s2&s0&~cd1&cd0) & (s2|s1|s0|cd0^1) & ~(s1&s0) & (s1|s0|cd1^1) & (s1|cd0|cd1^1) & 1;
				cr0 = ~s2&(s1|cd0);

				//сравнение направления, в котором находится истинное положение квадрата и направления квадратов для выделения для этой стороны
				cur_dir = cr1 ^ cr0 ^ cq2 ^ cr0&cq1 ^ cq1&cq0 ^ cr1&cr0&cq0 ^ cr1&cq1&cq0 ^ cr0&cq2&cq0 ^ cr0&cq1&cq0 ^ cq2&cq1&cq0 ^ 1; //dir

				if(cur_dir){
					ram[k + 0x38|0] = i;
					k = (k + 1)|0;
					if(is_rot){
						//определение стороны перемещения //side
						cur_side = s1 ^ cd1 ^ spin ^ s2&cd0 ^ s1&cd0 ^ s0&cd0 ^ s2&s1&cd1 ^ s2&s1&spin ^ s2&s1&s0&cd0 ^ 1 | (~s1&~cd0&1)<<1 | (~s2&cd0&1)<<2;
						//перемещаем квадрат в эту сторону
						cur_ram = (cur_ram & 31) | (cur_side<<5);
						ram[i] = cur_ram;

						//изменяем направление, в котором данная сторона находится по отношению к поворачиваемой
						cur_dir = cd0 ^ spin | (cd1 ^ cd0 & spin)<<1;

						cd1 = cur_dir>>>1&1;
						cd0 = cur_dir&1;

						//опрделяем, как должен повернуться квадрат в данном направлении по отношению к поворачиваемой
						cur_rot = s2 ^ s1 ^ 1 | ((s2 ^ s0 ^ cd1 ^ s2&cd1 ^ s2&cd0 ^ 1)&~s1)<<1&2;
						//поворачиваем квадрат на этот угол
						cur_rot = cur_ram + cur_rot & 3;
						//применяем поворот
						ram[i] = (cur_ram & 252) | cur_rot;
					}
				}
			}
		}

		return 1|0;
	}

	function fetch(i){
		i = i|0;
		return ram[i]|0;
	}

	return {init:init, get_side:get_side, rotate:rotate, fetch:fetch}
})({Uint8Array:  Uint8Array}, null,	new ArrayBuffer(0x44));
