// Реализуйте связанный список с использованием классов

// Вспомогательный класс элемента спсика
class Node {
  constructor(value) {
    this.value = value // значение
    this.next = null // ссылка на следующий элемент в списке
  }
}

// Класс списка
class LinkedList {
  #_length = 0

  get length(){
    return this.#_length
  }

  constructor(array) {
    this.head = null
    this.tail = null
    array && this.#fromArray(array)
  }

  append(data) {
    //метод добавления элемента в конец списка
    this.tail.next = new Node(data);
    this.tail = this.tail.next;
  }

  prepend(data) {
    //метод добавления элемента в начало списка
    const newNode = new Node(data);
    newNode.next = this.head;
    this.head = newNode;
  }

  find(value) {
    // рекурсивный метод поиска элемента в списке
    if (!this.head) return -1;
    if (this.head.value === value)
      return 0;
    else {
      const tailLinkedList = new LinkedList();
      tailLinkedList.head = this.head.next;
      let tailValuePosition = tailLinkedList.find(value);
      return tailValuePosition === -1 ? -1 : tailValuePosition + 1;
    }
    //return position // возвращает позицию элемента в списке
  }

  removeByPosition(position) {
    // метод удаления элемента из списка по его позиции
    if (position <= 0) {
      if (this.head && position === 0) {
        this.head = this.head.next;
        if (!this.head) this.tail = null;
      } else
        throw Error('wrong position');
    } else {
      let node = this.head;
      let ind = 1;
      while (ind !== position && node.next != null) {
        node = node.next;
        ind++;
      }
      if (node.next != null) {
        if (!node.next.next) this.tail = node;
        node.next = node.next.next;
      } else {
        throw Error('wrong position');
      }
    }
  }

  remove(value) {
    //метод удаления элемента из спика
    let prevNode = this.head;
    while (prevNode && prevNode.value === value) {
      this.head = prevNode.next;
      prevNode = this.head.next;
    }
    while (prevNode && prevNode.next) {
      const nextNode = prevNode.next;
      if (nextNode.value === value) {
        prevNode.next = nextNode.next;
      } else {
        prevNode = prevNode.next;
      }
    }
    this.tail = prevNode;
  }

  toArray() {
    //метод преобразования в массив возвращает  массив значений каждой Node по
    //ключу value
    let tempHead = this.head;
    const result = [];
    while (tempHead != null) {
      result.push(tempHead.value);
      tempHead = tempHead.next;
    }
    return result;
  }

  #fromArray(array) {
    //метод инициализации связанного списка из массива
    array.forEach((element, ind) => {
      const newNode = new Node(element);
      if (this.tail) {
        this.tail.next = newNode;
        this.tail = this.tail.next;
      } else {
        this.head = this.tail = newNode;
      }
    });
  }
}


const ll = new LinkedList([5, 4, 3, 2, 1, 0, 0, 20, 12345]);

console.log('Start list: ', ll.toArray());

console.log('Value 20 is on position: ' + ll.find(20));

ll.remove(0);
console.log('After removing all 0: ', ll.toArray());

ll.removeByPosition(5);
console.log('After removing by position 5: ', ll.toArray());

ll.removeByPosition(0);
console.log('After removing by position 0: ', ll.toArray());

ll.removeByPosition(4);
console.log('After removing by position 4: ', ll.toArray());

ll.remove(4);
console.log('After removing all 4: ', ll.toArray());

ll.remove(1);
console.log('After removing all 1: ', ll.toArray());

ll.append(100);
console.log('After appending 100: ', ll.toArray());

ll.prepend(200);
console.log('After prepending 200: ', ll.toArray());