/* =========================================================
   EXECUTOR DE ROTEIROS — lê os passos de src/data/roteiros
   e executa um por um (falas, quiz, itens, emoções...).
   ========================================================= */

const ScriptRunner = {
  /** Escolhe a variação certa do roteiro de acordo com as flags. */
  pick(ref) {
    const variants = typeof ref === 'string' ? ROTEIROS[ref] : ref;
    if (!variants) { console.warn('Roteiro não encontrado:', ref); return null; }
    return variants.find((v) => (!v.se || SaveSystem.flag(v.se)) && (!v.seNao || !SaveSystem.flag(v.seNao)));
  },

  async run(scene, passos) {
    for (const p of passos) {
      if (scene.leaving) return;

      if ('fala' in p) {
        await UI.dialog.say(p.quem || 'narrador', p.fala, p.rosto);
        continue;
      }
      if (!p.quiz) UI.dialog.hide();

      if (p.quiz) await UI.quiz.run(QUIZZES[p.quiz]);
      else if (p.item) await UI.item(p.item, p.texto, p.titulo);
      else if (p.marcar) SaveSystem.setFlag(p.marcar);
      else if (p.emocao) await scene.emote(p.emocao, p.tipo);
      else if (p.olhar) scene.lookAt(p.olhar, p.para);
      else if (p.esperar) await UI.wait(p.esperar);
      else if (p.coracoes) await scene.celebrate();
      else if (p.som) AudioSystem.play(p.som);
      else if (p.memoria) await UI.memory(p.memoria);
      else if (p.andar) await scene.walkTo(p.andar, p.ate || 'jogador', p.distancia);
      else if (p.transicao) await UI.timeskip(p.transicao, () => p.posicoes && scene.place(p.posicoes));
      else if (p.ligacao) await UI.phoneCall(p.ligacao);
      else if (p.aparecer) scene.appear(p.aparecer);
      else if (p.sair) await scene.exitThrough(p.sair, p.para);
      else if (p.beijo) await scene.kiss(p.beijo);
      else if (p.concluirFase) await scene.completePhase(p.concluirFase);
      else console.warn('Passo desconhecido no roteiro:', p);
    }
  },
};
