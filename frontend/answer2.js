// Предположим, на клиент c сервера приходит массив объектов вида
const obj = {
    id: "id0",
    fields: {
        // поля могут содержать строку или число
        // поля fields в разных объектах могут иметь одинаковые значения 
    }
}

// Так же имеется сам фильтр:
class Filter {
    constructor(initialState) {
        //state содержит пары ключ: значение
        //значение всегда имеет тип String
        this.state = initialState || {}
    }

    set(key, value) {
        this.state = { ...this.state, [key]: value }
    }

    remove(key) {
        this.state = { ...this.state, [key]: null }
    }

    clear() {
        this.state = {}
    }
}

//есть функция fn принимающая массив и state обьекта Filter
function fn(array, filterState) {
    const keys = Object.keys(filterState)

    return keys.length === 0
        ? array
        : recurceFiltration(/*аргументы*/)
}

function recurceFiltration(array, filterState) {
    // напишите рекурсивную функцию фильтрации массива
    // значения Filter.state[key] могут являться частью значения в поле обьектов obj.fields
    // выход из рекурсии должен возвращать отфильтрованный массив содержащий id элементов.
    if (!array.length) return [];
    const obj = array[0];
    for (let key in obj.fields) {
      const value = '' + obj.fields[key];
      for (const filterValue of Object.values(filterState)) {
        if (filterValue !== null && value.includes(filterValue)) return recurceFiltration(array.slice(1), filterState);
      }
    }
    let answer = [obj.id];
    answer.push.apply(answer, recurceFiltration(array.slice(1), filterState));
    return answer;
}

const filterObj = {
  1: 'oo',
  2: 'abb'
}

const filterInstance = new Filter(filterObj);
filterInstance.set('newkey', 'aaa');
filterInstance.remove('newkey');

console.log(
  recurceFiltration([
    {
      id: 'id0',
      fields: {
        'some': 'ooo roga i kopita',
        'other': 123
      }
    },
    {
      id: 'id1',
      fields: {
        'some': 'company inc',
        'other': 123,
        'third': 'aaa aaa aaa',
        'fourth': 'null'
      }
    },
  ],
  filterInstance.state)
)

