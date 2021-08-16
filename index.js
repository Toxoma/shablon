var templates = [
    'frame18.png',
];

$('#demo-test').click(function () {

    var articul = $('#art').val(),
        art1part = articul.substr(0, 4),
        iRand = Math.floor(Math.random() * templates.length),
        $button = $(this);

    console.log(templates[iRand]);

    $.ajax({
        url: 'https://images.wbstatic.net/big/new/' + art1part + '0000/' + articul + '-1.jpg',
        success: function (resp) {
            console.log('yes');
            $('#error-msg').css({
                display: 'none'
            })
            $('#demo-result').css({
                display: 'block'
            });
            $('#text').css({
                display: 'grid'
            })

            $('#photo-from-wb').css({
                background: 'url("https://images.wbstatic.net/big/new/' + art1part + '0000/' + articul + '-1.jpg") no-repeat 50% 50%',
                display: 'block'
            });

            $('#template').css({
                background: 'url("https://files.myguru.ru/site-templates/' + templates[iRand] + '") no-repeat 50% 50%',
                display: 'block'
            });

            $button.html('Другой шаблон');
            $('input[name=sku]').val(articul).parents('form:first').find('button:first').click();
        },
        error: function () {
            $('#demo-result').css({
                display: 'block'
            });

            $('#error-msg').css({
                display: 'block'
            })

            $('#template').css({
                display: 'none'
            })
            $('#photo-from-wb').css({
                display: 'none'
            })
            $('#text').css({
                display: 'none'
            })

        }
    })

    return false;
});
//_____________________________________
$('#template').remove();

let canvas,
    group1 = null,
    group3 = null,
    group4 = null,
    group5 = null,
    group2 = null;

//canvas weight / height
const cw = 450,
    ch = 600;

//create canvas if not created
if (document.getElementById('c') === null) {
    const canvasTemplate = `<canvas id="c" width="${cw}" height="${ch}"></canvas>`;
    $('#photo-from-wb').before(canvasTemplate);
    canvas = new fabric.Canvas('c');
    $('.canvas-container').attr('style', '');
}

//Плиссированная юбка
let textForGroup1 = 'Плиссированная юбка';
const createGroup1 = () => {
    const createText = () => {
        const shadow1 = new fabric.Shadow({
            color: '#cc3adf',
            blur: 1,
            offsetX: -3,
            offsetY: 2,
        });
        const shadow2 = new fabric.Shadow({
            color: '#15efe4',
            blur: 1,
            offsetX: 0,
            offsetY: -3
        });

        const left = 0,
            top = 0,
            fz = 24,
            fill = '#fff',
            fw = 700;

        const first = new fabric.Text(textForGroup1, {
            left: left,
            top: top,
            fontSize: fz,
            fill: fill,
            shadow: shadow1,
            fontFamily: 'sans-serif',
            fontWeight: fw,
            fontStyle: 'italic',
            originX: 'center',
            originY: 'center'
        });

        const second = new fabric.IText(textForGroup1, {
            left: left,
            top: top,
            fontSize: fz,
            fill: fill,
            shadow: shadow2,
            fontFamily: 'sans-serif',
            fontWeight: fw,
            originX: 'center',
            originY: 'center',
            id: 'text',
        });

        //!изменение текста сразу в 2х блоках
        second.on('changed', function(e) {
            first.set({
                text: second.text,
            });
        });

        group1 = new fabric.Group([first, second], {
            id: 'shadowGroup',
        });
        group1.set({
            left: 20,
            top: ch - group1.height - 100,
        });

        canvas.add(group1);
    };

    if (!group1) {
        createText();
    }

};
createGroup1();

//хит продаж
const createGroup2 = () => {
    fabric.Image.fromURL('./img/v_01.png', function (img) {
        img.set({
            width: 140,
            height: 60,
            originX: 'center',
            originY: 'center'
        });

        const el = new fabric.IText('ХИТ ПРОДАЖ!', {
            left: 10,
            top: 0,
            lineHeight: 1500,
            fontSize: 14,
            fill: '#cc3adf',
            angle: -8,
            fontFamily: 'sans-serif',
            fontWeight: 700,
            originX: 'center',
            originY: 'center',
        });

        group2 = new fabric.Group([img, el]);
        group2.set({
            left: group1.width + group1.left + 20,
            top: group1.top - 10,
        });
        canvas.add(group2);
    });
};
createGroup2();

//c молнией сбоку
const createGroup3 = () => {
    const text = new fabric.IText('(с молнией сбоку)', {
        left: 40,
        fontSize: 14,
        fill: "#000",
        fontFamily: 'sans-serif',
        originY: 'center',

    });

    const rect = new fabric.Rect({
        fill: '#3fc4f8',
        width: text.width + 50,
        height: text.height + 4,
        originY: 'center',
        opacity: 0.5,
    });

    group3 = new fabric.Group([rect, text]);
    group3.set({
        left: -15,
        top: group1.top + group1.height,
    });
    canvas.add(group3);
};
createGroup3();

//Цвет
const createGroup4 = () => {
    const text = new fabric.IText('Цвет', {
        fontSize: 12,
        fontWeight: 600,
        fill: "#000",
        fontFamily: 'sans-serif',
        originY: 'center',
    });

    const circle1 = new fabric.Circle({
        top: 25,
        fill: '#3fc4f8',
        radius: 10,
        originY: 'center',
    });
    const circle2 = new fabric.Circle({
        top: 25,
        left: 25,
        fill: '#b62525',
        radius: 10,
        originY: 'center',
    });
    const circle3 = new fabric.Circle({
        top: 25,
        left: 50,
        fill: '#18b425',
        radius: 10,
        originY: 'center',
    });

    group4 = new fabric.Group([text, circle1, circle2, circle3], {
        left: 0,
        top: 0,
    });
    canvas.add(group4);
};
createGroup4();

//Размер
const createGroup5 = () => {
    const topText = new fabric.IText('Размер', {
        fontSize: 12,
        fontWeight: 600,
        fill: "#000",
        fontFamily: 'sans-serif',
    });

    const tColor = '#a312d3',
        fw = 600,
        fz = 16,
        ff = 'sans-serif';

    const text1 = new fabric.IText('XS', {
        top: topText.height + 5,
        fontSize: fz,
        fontWeight: fw,
        fill: tColor,
        fontFamily: ff,
    });
    const text2 = new fabric.IText('S', {
        left: text1.left + text1.width + 12,
        top: topText.height + 5,
        fontSize: fz,
        fontWeight: fw,
        fill: tColor,
        fontFamily: ff,
    });
    const text3 = new fabric.IText('M', {
        left: text2.left + text2.width + 12,
        top: topText.height + 5,
        fontSize: fz,
        fontWeight: fw,
        fill: tColor,
        fontFamily: ff,
    });
    const text4 = new fabric.IText('L', {
        left: text3.left + text3.width + 12,
        top: topText.height + 5,
        fontSize: fz,
        fontWeight: fw,
        fill: tColor,
        fontFamily: ff,
    });

    group5 = new fabric.Group([topText, text1, text2, text3, text4]);
    group5.set({
        top: group4.height + 20,
    });
    canvas.add(group5);
};
createGroup5();

//!обработчик для текста с тенью
$(document).on("dblclick", (e) => {
    const o = canvas.getActiveObject();

    if (o && o.id === 'shadowGroup') {
        //ниже разбор группы на элементы
        const items = o._objects;

        o._restoreObjectsState();
        canvas.remove(o);

        for (let i = 0; i < items.length; i++) {
            canvas.add(items[i]);
            //параметры чтобы в разобранном состоянии нельзя было ненароком сместить тень
            items[i].set({
                hasControls: false,
                lockMovementX: true,
                lockMovementY: true,
            });

            if (items[i].id && items[i].id === 'text') {
                const groupEvent = ()=>{
                    const o = canvas.getActiveObject();

                    if (!o || o.id !== 'text') {
                        //убрали событие выхода из фокуса
                        document.removeEventListener('click', groupEvent);

                        items.forEach(el=>{
                            //возвращаем параметры элементов к исходнику - эт чтоб можно было собранную группу перетаскивать (без этого не работало)
                            el.set({
                                lockMovementX: false,
                                lockMovementY: false,
                            });

                            //удаляем разобранные элементы
                            canvas.remove(el);
                        });

                        //создаём группу
                        const newGroup = new fabric.Group([...items], {
                            id: 'shadowGroup',
                        });
                        canvas.add(newGroup);
                    }
                };
                //событие выхода из фокуса (обратная группировка)
                document.addEventListener('click', groupEvent);
            }   
        }
    }
});