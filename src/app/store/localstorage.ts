export function saveState(state: any) {
    localStorage.setItem('appState', JSON.stringify(state));
}

export function loadState(): any {
    const state = localStorage.getItem('appState');
    const json = state ? JSON.parse(state) : undefined;
    return json;
}