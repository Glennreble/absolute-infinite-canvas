function formatNumber(d)
{
    d = new Decimal(d);

    if(d.eq(0)) return "0";
    if(d.lt(0.05))
    {
        return "1 / " + formatNumber(new Decimal(1).div(d));
    }

    if (d.lt(1e3))
    {
        return d.toFixed(2);
    }
    if (d.lt(1e13))
    {
        return d.toNumber().toLocaleString("en-us", {minimumFractionDigits: 0, maximumFractionDigits: 0});
    }
    else
    {
        return d.toExponential(2);
    }
}

function formatDistance(d)
{
    d = new Decimal(d);

    let pBig = ["", "k", "M", "G", "T", "P", "E", "Z", "Y", "R", "Q", "Qk", "Qm", "Qg", "Qt", "Qp", "Qe", "Qz", "Qy", "Qr", "A"];
    let pSmall = ["", "m", "μ", "n", "p", "f", "a", "z", "y", "r", "q", "mq", "μq", "nq", "pq", "fq", "aq", "zq", "yq", "rq", "am"];

    let maxSI = Decimal.pow(10, 3 * pBig.length - 3), minSI = Decimal.pow(10, -3 * pSmall.length + 3);

    if (d.gt(1000) && d.lt(maxSI))
    {
        return Decimal.pow(10, Decimal.log10(d) % 3).toFixed(2) + " " + pBig[Math.floor(d.e / 3)] + "m";
    }
    else if (d.lt(1) && d.gt(minSI))
    {
        return Decimal.pow(10, 3 + (Decimal.log10(d) % 3)).toFixed(2) + " " + pSmall[Math.floor(-Decimal.log(d, 1000)) + 1] + "m";
    }
    else if(d.gte(maxSI))
    {
        return formatNumber(d.div(maxSI)) + " " + pBig[pBig.length - 1] + "meters";
    }
    else if(d.lte(minSI))
    {
        return formatNumber(d.div(minSI)) + " " + pSmall[pSmall.length - 1] + "meters";
    }
    return d.toFixed(2) + " Meters";
}

function vmax()
{
    return Math.max(canvas.width, canvas.height);
}

class Utils
{
    static setFont(size, fonts)
    {
        if (typeof fonts === "string")
        {
            return (vmax() * size) + "px " + fonts;
        }
        else
        {
            return (vmax() * size) + "px " + fonts.join(",");
        }
    }

    static drawRotatedImage(rotation, image, sx, sy, sw, sh, dx, dy, dw, dh)
    {
        ctx.translate(sx + sw / 2, sy + sh / 2);
        ctx.rotate(rotation);
        ctx.drawImage(image, 0 - sw / 2, 0 - sh / 2, sw, sh);
        ctx.rotate(-rotation);
        ctx.translate(-sx - sw / 2, -sy - sh / 2);
    }
}
