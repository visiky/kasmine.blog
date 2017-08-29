function parseFnType(text) {
    let args = [], pos = 3

    function skipMatching(upto) {
        let depth = 0, start = pos
        for (; ;) {
            let next = text.charAt(pos)
            if (upto.test(next) && !depth) return text.slice(start, pos)
            if (/[{\[\(]/.test(next))++depth
            else if (/[}\]\)]/.test(next))--depth
            ++pos
        }
    }

    // Parse arguments
    if (text.charAt(pos) != ')') for (; ;) {
        let name = text.slice(pos).match(/^([^, \(\[\{]+): /)
        if (name) {
            pos += name[0].length
            name = name[1]
        }
        args.push({ name: name, type: skipMatching(/[\),]/) })
        if (text.charAt(pos) == ')') break
        pos += 2
    }

    let rettype = text.slice(pos).match(/^\) -> (.*)$/)

    return { args: args, rettype: rettype && rettype[1] }
}

parseFnType('fn(x: number, y: ?)');
// => [{name: 'x', type: 'number' }, {name: 'y', type: '?'}]
