import { createElement, vNode, vNodeTagElement } from "./utils/createElement";

import { createDomElement } from "./utils/createDomElement";

class Renderer {
  render(vDom: vNodeTagElement, realDomRoot: HTMLElement) {
    const vDomRoot = createElement(
      realDomRoot.tagName,
      {
        id: realDomRoot.id,
      },
      [vDom]
    );

    this.sync(vDomRoot, realDomRoot);
  }

  sync(vDom: vNodeTagElement, realDom: HTMLElement) {
    Object.entries(vDom.attributes).forEach(([key, value]) => {
      (realDom as any)[key] = value;
    });

    // Sync chilren

    const elemntsForDelete: ChildNode[] = [];

    for (
      let i = 0;
      i < Math.max(realDom.childNodes.length, vDom.children.length);
      i++
    ) {
      const vNode = vDom.children[i];
      const realNode = realDom.childNodes[i];

      // Add
      if (vNode !== undefined && realNode === undefined) {
        const newDomElement = createDomElement(vNode);

        realDom.append(newDomElement);

        if (typeof vNode === "object" && newDomElement instanceof HTMLElement) {
          this.sync(vNode, newDomElement);
        }
      }

      // Update
      if (
        vNode !== undefined &&
        realNode !== undefined &&
        ((typeof vNode === "object" &&
          realNode instanceof HTMLElement &&
          vNode.type === realNode.tagName.toLowerCase()) ||
          (typeof vNode === "string" && realNode instanceof Text))
      ) {
        if (
          typeof vNode === "object" &&
          realNode instanceof HTMLElement &&
          vNode.type === realNode.tagName.toLowerCase()
        ) {
          this.sync(vNode, realNode);
        } else if (typeof vNode === "string" && realNode instanceof Text) {
          realNode.textContent = vNode;
        }
      }

      // Replace
      if (
        vNode !== undefined &&
        realNode !== undefined &&
        typeof vNode === "object" &&
        realNode instanceof HTMLElement &&
        vNode.type !== realNode.tagName.toLowerCase()
      ) {
        const newRealNode = createDomElement(vNode) as HTMLElement;
        this.sync(vNode, newRealNode);
        realDom.replaceChild(realNode, newRealNode);
      }

      // Delete
      if (vNode === undefined && realNode !== undefined) {
        elemntsForDelete.push(realNode);
        // realNode.remove();
      }
    }

    elemntsForDelete.forEach((e) => {
      e.remove();
    });
  }
}

export { Renderer };
