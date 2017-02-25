function history_push(side){
	if(!!persperctive_cube && !!persperctive_cube.length){ //бывают и конструктивные односложные решения
		if(progress < persperctive_cube.length  && persperctive_cube.length !== 1 && (persperctive_cube[progress] === side || (!!persperctive_cube[progress + 1] && persperctive_cube[progress + 1] === (side^8) && persperctive_cube[progress] === (side^8)) || (!!persperctive_cube[progress - 1] && persperctive_cube[progress - 1] === (side&7)))){
			progress++;
			var i = history_cube.length;
			if(!!history_table.rows[0].cells[i]){
				history_cube.push(side);
				history_table.rows[0].cells[i].classList.remove('expected');
			}
			if(persperctive_cube.length === progress){
				progress = 0;
				persperctive_cube = null;
			}
		} else {
			for(var i = persperctive_cube.length; i > progress; i--){
				if(!!history_table.rows[0].lastElementChild){
					history_table.rows[0].removeChild(history_table.rows[0].lastElementChild);
				}
			}
			history_cube.push(side);
			history_table.rows[0].insertAdjacentHTML('beforeend', '<td>' + dic.side2[side&7] + (side&8 ? '\'' : '') + '</td>');
			history_table.rows[0].lastElementChild.onclick = history_cube_element_click

			progress = 0;
			persperctive_cube = null;
		}
	} else {
		history_cube.push(side);
		history_table.rows[0].insertAdjacentHTML('beforeend', '<td>' + dic.side2[side&7] + (side&8 ? '\'' : '') + '</td>');
		history_table.rows[0].lastElementChild.onclick = history_cube_element_click
	}

	//str = dic.side2[side&7] + (side&8 ? '\'' : '');
	//str += '<br />' + progress;
	str = 'История (длина ' + history_cube.length + '): ';
	for(var i = 0; i < history_cube.length; i++){
		str += dic.side2[history_cube[i]&7] + (history_cube[i]&8 ? '\'' : '');
	}
}

function history_cube_element_click(){
	//история - массив пройденных шагов. номер ячейки - номер в массиве истории.
	//есть переменная-номер текущего шага. при клике на элементы слева формируется последовательность
	//обратных поворотов до этого шага и номер сменяется. история иногда пополняется списком поворотов, которые нужно совершить.
	//при клике на них нужные повороты совершаются и номер меняется. если совершенный поворот не тот,
	//который в списке, то номер меняется, а все, что слева от номера удаляется.
	//если действуется не по плану, то придумать новый план, если по плану, то отображать прогресс.
	//должен быть список допустимых действий, чтобы можно было выбрать, как повернуть.
	var cellIndex = this.cellIndex, length = history_cube.length, side = 255;

	str = '';

	if(cellIndex < length){
		//var str = 'Которые в списке ожидания ';

		if(!!persperctive_cube && !!persperctive_cube.length)
		for(var i = persperctive_cube.length; i > progress; i--){
			if(!!history_table.rows[0].lastElementChild){
				//str += history_table.rows[0].lastElementChild.innerHTML;
				history_table.rows[0].removeChild(history_table.rows[0].lastElementChild);
			}
		}
		//alert(str);

		progress = 0;
		persperctive_cube = null;
		//str = 'Которые в истории ';

		for(var i = length - 1; i > cellIndex; i--, length--){
			side = history_cube[i] ^ 8;
			//str += dic.side2[side&7] + (side&8 ? '\'' : '');
			rotate(side);
			history_cube.pop();
			history_table.rows[0].removeChild(history_table.rows[0].cells[i]);
		}
		//alert(str);
	} else {
		//str = 'Которые во всплывающей подсказке ';
		if(!!persperctive_cube && !!persperctive_cube.length)
		for(var i = progress; i < persperctive_cube.length; i++){
			progress++;
			side = persperctive_cube[i];
			//str += dic.side2[side&7] + (side&8 ? '\'' : '');
			if(!!history_table.rows[0].cells[length + i]){
				history_cube.push(side);
				rotate(side);
				history_table.rows[0].cells[length + i].classList.remove('expected');
			}
		}
		if(persperctive_cube.length === progress){
			progress = 0;
			persperctive_cube = null;
		}
	}

	if(side != 255) str = dic.side2[side&7] + (side&8 ? '\'' : '');
	//str += '<br />' + progress;
	str += '<br />История (длина ' + history_cube.length + '): ';
	for(var i = 0; i < history_cube.length; i++){
		str += dic.side2[history_cube[i]&7] + (history_cube[i]&8 ? '\'' : '');
	}
	calc();
	document.querySelector('.container').childNodes[0].innerHTML = str;
}
