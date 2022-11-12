function subscribe(eventName: string, listener: any): void
{
    document.addEventListener(eventName, listener);
}

function unsubscribe(eventName: string, listener: any): void
{
    document.removeEventListener(eventName, listener);
}

function publish(eventName: string, data: Object): void
{
    const event = new CustomEvent(eventName, data);
    document.dispatchEvent(event);
}

export 
{
    subscribe,
    unsubscribe,
    publish
}