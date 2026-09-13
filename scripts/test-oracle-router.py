import importlib.util
from pathlib import Path
import tempfile
import unittest
spec=importlib.util.spec_from_file_location('router',Path(__file__).resolve().parents[1]/'skills/oracle/scripts/discover.py')
router=importlib.util.module_from_spec(spec);spec.loader.exec_module(router)
class DiscoveryTests(unittest.TestCase):
 def test_routing_symlinks_resources_and_explicit_only(self):
  with tempfile.TemporaryDirectory() as tmp:
   root=Path(tmp);vault=root/'Vault outro nome/SISTEMA/skills';host=root/'host';host.mkdir()
   offer=vault/'oferta/alex-hormozi/offers';offer.mkdir(parents=True)
   (offer/'SKILL.md').write_text('---\nname: offers\ndescription: Construir oferta e proposta de valor\n---\nProcedure')
   (host/'installed').symlink_to(offer,target_is_directory=True)
   nested=offer/'references/example';nested.mkdir(parents=True);(nested/'SKILL.md').write_text('---\nname: fake-offer\n---\n')
   explicit=host/'special';explicit.mkdir();(explicit/'SKILL.md').write_text('---\nname: offer-explicit\ndescription: oferta\ndisable-model-invocation: true\n---\n')
   result=router.discover([host,vault],'criar oferta')
   self.assertEqual(len(result['skills']),2)
   self.assertEqual({s['name'] for s in result['skills']},{'offers','offer-explicit'})
   self.assertFalse(next(s for s in result['skills'] if s['name']=='offer-explicit')['automatic'])
   self.assertTrue(any('alex-hormozi' in s['path'] for s in result['skills']))
 def test_missing_and_limit(self):
  with tempfile.TemporaryDirectory() as tmp:
   self.assertEqual(router.discover([Path(tmp)/'missing'],'oferta')['issues'][0]['reason'],'unavailable')
if __name__=='__main__':unittest.main()
