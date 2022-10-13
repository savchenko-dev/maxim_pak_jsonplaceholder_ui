import { vNode } from "./createElement";

export function createDomElement(vNode: vNode): HTMLElement | Text {
  if (typeof vNode === "object") {
    const element = document.createElement(vNode.type);

    Object.entries(vNode.attributes).forEach(([key, value]) => {
      if (key.indexOf("data-") === 0) {
        (element as any).dataset[key.replace("data-", "")] = value;
      } else {
        (element as any)[key] = value;
      }
    });

    return element;
  } else if (typeof vNode === "string") {
    const element = document.createTextNode(vNode);

    return element;
  }

  return null;
}
