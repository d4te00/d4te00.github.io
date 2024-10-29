interface Bitly {
    shorten(longUrl: string): Promise<{ data: { url: string } }>;
}

declare module 'bitly-api' {
    export default Bitly;
}