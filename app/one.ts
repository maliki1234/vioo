interface Cut {
    width: number;
    height: number;
    x?: number;
    y?: number;
}

interface Sheet {
    width: number;
    height: number;
    grid: boolean[][];
}

function initializeSheet(width: number, height: number): Sheet {
    const grid: boolean[][] = [];
    for (let i = 0; i < height; i++) {
        grid.push(Array(width).fill(false));
    }
    return { width, height, grid };
}

function canPlaceCut(sheet: Sheet, cut: Cut, x: number, y: number): boolean {
    for (let i = y; i < y + cut.height; i++) {
        for (let j = x; j < x + cut.width; j++) {
            if (i >= sheet.height || j >= sheet.width || sheet.grid[i][j]) {
                return false;
            }
        }
    }
    return true;
}

function placeCut(sheet: Sheet, cut: Cut, x: number, y: number): void {
    for (let i = y; i < y + cut.height; i++) {
        for (let j = x; j < x + cut.width; j++) {
            sheet.grid[i][j] = true;
        }
    }
    cut.x = x;
    cut.y = y;
}

export function optimizeGlassCutting(sheetWidth: number, sheetHeight: number, cuts: Cut[]): Cut[] {
    // Sort cuts by area in descending order
    cuts.sort((a, b) => b.width * b.height - a.width * a.height);

    const sheet = initializeSheet(sheetWidth, sheetHeight);
    const placedCuts: Cut[] = [];

    for (const cut of cuts) {
        let placed = false;
        for (let y = 0; y <= sheet.height - cut.height && !placed; y++) {
            for (let x = 0; x <= sheet.width - cut.width && !placed; x++) {
                if (canPlaceCut(sheet, cut, x, y)) {
                    placeCut(sheet, cut, x, y);
                    placedCuts.push({ ...cut });
                    placed = true;
                }
            }
        }
    }

    return placedCuts;
}

// Example usage:
const sheetWidth = 100;
const sheetHeight = 50;
const cuts: Cut[] = [
    { width: 20, height: 30 },
    { width: 10, height: 15 },
    { width: 25, height: 25 },
];

// const optimizedCuts = optimizeGlassCutting(sheetWidth, sheetHeight, cuts);
// console.log(optimizedCuts);
