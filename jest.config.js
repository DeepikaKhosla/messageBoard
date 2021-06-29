module.exports = {
    "roots": [
        "<rootDir>/src",
        "<rootDir>/tests"
    ],
    "testMatch": [
        "**/test/**/*.test.(ts|js)",
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)"
    ],
    "transform": {
        "^.+\\.(ts|tsx)$": "ts-jest"
    },
    globals: {
        "ts-jest": {
            tsConfig: "tsconfig.json"
        }
    }
}