// 3. Клас Key
class Key {
  private signature: number;

  constructor() {
    this.signature = Math.random();
  }

  getSignature(): number {
    return this.signature;
  }
}

// 4. Клас Person
class Person {
  constructor(private key: Key) {}

  getKey(): Key {
    return this.key;
  }
}

// 1. Абстрактний клас House
abstract class House {
  protected door: boolean = false; // false — закрита, true — відкрита
  protected tenants: Person[] = [];

  constructor(protected key: Key) {}

  comeIn(person: Person): void {
    if (!this.door) {
      console.log('Двері закриті! Спочатку потрібно їх відкрити.');
      return;
    }

    this.tenants.push(person);
    console.log('Людина успішно зайшла до будинку.');
  }

  abstract openDoor(key: Key): void;
}

// 2. Клас MyHouse, який успадковує House
class MyHouse extends House {
  openDoor(key: Key): void {
    if (key.getSignature() === this.key.getSignature()) {
      this.door = true;
      console.log('Ключ підійшов. Двері відчинено!');
    } else {
      console.log('Невірний ключ! Двері залишаються зачиненими.');
    }
  }
}

// 5. Логіка: мешканець потрапляє додому

// Створюємо ключ для будинку
const houseKey = new Key();

// Створюємо будинок і передаємо йому ключ
const myHouse = new MyHouse(houseKey);

// Створюємо людина, яка має той самий ключ
const person = new Person(houseKey);

// Пробуємо зайти з зачиненими дверима
myHouse.comeIn(person);

// Відкриваємо двері за допомогою ключа людини
myHouse.openDoor(person.getKey());

// Тепер людина заходить у будинок
myHouse.comeIn(person);