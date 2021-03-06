// 双链表
import { LinkedList } from '../types';

class Node<T> {
  public element: T;

  public prev: Node<T> | null;

  public next: Node<T> | null;

  constructor(element: T, prev: Node<T> | null, next: Node<T> | null) {
    this.element = element;
    this.prev = prev;
    this.next = next;
  }
}

export default class DoubleLinkedList<T> implements LinkedList<T> {
  // 虚拟头头结点(头指针，用于添加、删除统一操作)
  private dummyHead: Node<T>;

  // 虚拟头头结点(头指针，用于添加、删除统一操作)
  private dummyTail: Node<T>;

  // 链表中元素的数量
  private size: number;

  // 比较是否相等
  private areEqual: (a: T, b: T) => boolean;

  constructor(areEqual?: (a: T, b: T) => boolean) {
    this.dummyHead = new Node(null!, null, null);
    this.dummyTail = new Node(null!, null, null);
    this.dummyHead.next = this.dummyTail;
    this.dummyTail.prev = this.dummyHead;
    this.size = 0;
    const defaultAreEqual = (a: T, b: T) => a === b;
    this.areEqual = areEqual || defaultAreEqual;
  }

  public isEmpty(): boolean {
    return this.size === 0;
  }

  public getSize(): number {
    return this.size;
  }

  public contains(e: T): boolean {
    let cur: Node<T> | null = this.dummyHead.next;
    while (cur !== null && cur !== this.dummyTail) {
      if (this.areEqual(cur.element, e)) {
        return true;
      }
      cur = cur.next;
    }
    return false;
  }

  public get(index: number): T {
    if (index < 0 || index > this.size - 1) {
      throw new Error('无效的索引');
    }
    let cur = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      cur = cur!.next;
    }
    return cur!.element;
  }

  public getFirst(): T {
    return this.get(0);
  }

  public getLast(): T {
    return this.get(this.size - 1);
  }

  public set(index: number, e: T): void {
    if (index < 0 || index > this.size - 1) {
      throw new Error('无效的索引');
    }
    let cur = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      cur = cur!.next;
    }
    cur!.element = e;
  }

  public add(index: number, e: T): void {
    if (index < 0 || index > this.size) {
      throw new Error('无效的索引');
    }
    let prevNode = this.dummyHead;
    for (let i = 0; i < index; i++) {
      prevNode = prevNode.next!;
    }
    const newNode = new Node(e, prevNode, prevNode.next);
    prevNode.next!.prev = newNode;
    prevNode.next = newNode;
    this.size += 1;
  }

  public addFirst(e: T): void {
    this.add(0, e);
  }

  public addLast(e: T): void {
    this.add(this.size, e);
  }

  public remove(index: number): T {
    if (index < 0 || index > this.size - 1) {
      throw new Error('无效的索引');
    }
    let cur = this.dummyHead.next;
    for (let i = 0; i < index; i++) {
      cur = cur!.next;
    }
    cur!.prev!.next = cur!.next;
    cur!.next!.prev = cur!.prev;
    cur!.prev = null;
    cur!.next = null;
    this.size -= 1;
    return cur!.element;
  }

  public removeFirst(): T {
    return this.remove(0);
  }

  public removeLast(): T {
    return this.remove(this.size - 1);
  }
}
