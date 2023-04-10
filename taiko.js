const vf = new Factory({
    renderer: { elementId: 'output', width: 500, height: 200 },
});
const score = vf.EasyScore();
const system = vf.System();

const parser = peggy.generate("start = ('a' / 'b')+");
