export function splitAndStoreToken(token) {
    // Divise le token en deux parties (ici, nous utilisons simplement la méthode slice)
    const tokenPart1 = token.slice(0, token.length / 2);
    const tokenPart2 = token.slice(token.length / 2);

    // Stocke la première partie dans un cookie sécurisé
    document.cookie = `secure_token_part1=${encodeURIComponent(
        tokenPart1
    )}; Secure; SameSite=Strict; Path=/`;

    // Stocke la deuxième partie dans le localStorage
    localStorage.setItem("secure_token_part2", tokenPart2);
}

// function getCookie(name) {
//     const cookies = document.cookie.split("; ");
//     for (const cookie of cookies) {
//         const [cookieName, cookieValue] = cookie.split("=");
//         if (cookieName === name) {
//             return decodeURIComponent(cookieValue);
//         }
//     }
//     return null;
// }
// const secureTokenPart1 = getCookie("secure_token_part1");
// const secureTokenPart2 = localStorage.getItem("secure_token_part2");
// const completeToken = secureTokenPart1 + secureTokenPart2;

export function combineStoredToken() {
    // Récupère la première partie du token depuis le cookie sécurisé
    const cookies = document.cookie.split(";");
    let tokenPart1 = null;
    for (const cookie of cookies) {
        const [name, value] = cookie.trim().split("=");
        if (name === "secure_token_part1") {
            tokenPart1 = decodeURIComponent(value);
            break;
        }
    }

    // Récupère la deuxième partie du token depuis le localStorage
    const tokenPart2 = localStorage.getItem("secure_token_part2");

    // Vérifie que les deux parties existent
    if (!tokenPart1 || !tokenPart2) {
        return null;
    }

    // Réassemble les deux parties en un seul token
    const completeToken = tokenPart1 + tokenPart2;

    return completeToken;
}

export function clearStoredToken() {
    // Supprime le cookie sécurisé en le rendant expiré
    document.cookie =
        "secure_token_part1=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; secure;";

    // Supprime la valeur dans le localStorage
    localStorage.removeItem("secure_token_part2");
}
